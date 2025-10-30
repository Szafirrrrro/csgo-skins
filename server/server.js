// server/server.js
import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

import Cases, { GetCaseByName } from './cases.js';

/**
 * Basic HTTP API (REST) + Socket.IO realtime server
 * Port: 3001
 */

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

const app = express();

// Express CORS for REST
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));

app.use(express.json());

// --- REST endpoints ---
app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/cases', (_req, res) => {
  res.json(Cases);
});

app.get('/cases/:name', (req, res) => {
  const c = GetCaseByName(req.params.name);
  if (!c) return res.status(404).json({ error: 'Case not found' });
  res.json(c);
});

// --- HTTP server + Socket.IO ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// ---- In-memory Battle Store ----
// In production, replace with Redis/DB.
const battles = new Map();
/**
 * Battle shape:
 * {
 *   id: string,
 *   caseName: string,
 *   maxPlayers: 2|3|4,
 *   players: [{ id, name }],
 *   status: 'waiting' | 'starting' | 'finished' | 'cancelled',
 *   createdAt: number
 * }
 */

// ---- helpers ----
function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function clampPlayers(n) {
  const x = Number(n);
  if (Number.isNaN(x)) return 2;
  return Math.min(4, Math.max(2, x));
}

function publicBattleView(b) {
  // Hide any internal-only fields
  return {
    id: b.id,
    caseName: b.caseName,
    maxPlayers: b.maxPlayers,
    players: b.players.map((p) => ({ id: p.id, name: p.name })),
    status: b.status,
    createdAt: b.createdAt,
  };
}

function emitBattlesUpdate() {
  io.emit(
    'battlesUpdated',
    Array.from(battles.values()).map(publicBattleView)
  );
}

function cleanupBattleIfEmpty(battleId) {
  const b = battles.get(battleId);
  if (!b) return;
  if (b.players.length === 0) {
    battles.delete(battleId);
    emitBattlesUpdate();
  }
}

function startBattle(battleId) {
  const b = battles.get(battleId);
  if (!b) return;
  if (b.status !== 'waiting') return;

  b.status = 'starting';
  io.to(battleId).emit('battleStarting', publicBattleView(b));

  // TODO: Replace this demo result with real roll logic later
  setTimeout(() => {
    const winner =
      b.players[Math.floor(Math.random() * (b.players.length || 1))] || null;

    b.status = 'finished';
    io.to(battleId).emit('battleResult', {
      battle: publicBattleView(b),
      winner,
    });

    // Optionally cleanup finished battles after a while
    setTimeout(() => {
      if (battles.has(battleId) && battles.get(battleId).status === 'finished') {
        battles.delete(battleId);
        emitBattlesUpdate();
      }
    }, 60_000);
  }, 3000);
}

// ---- Socket.IO events ----
io.on('connection', (socket) => {
  // Send current battles on connect (optional)
  socket.emit(
    'battlesUpdated',
    Array.from(battles.values()).map(publicBattleView)
  );

  // Create a new battle
  socket.on('createBattle', ({ caseName, maxPlayers, name }, ack) => {
    try {
      const c = GetCaseByName(String(caseName || '').trim());
      if (!c) {
        return ack?.({ ok: false, error: 'Unknown case' });
      }

      const battle = {
        id: genId(),
        caseName: c.name,
        maxPlayers: clampPlayers(maxPlayers),
        players: [
          {
            id: socket.id,
            name: name?.trim() || `Player-${socket.id.slice(0, 4)}`,
          },
        ],
        status: 'waiting',
        createdAt: Date.now(),
      };

      battles.set(battle.id, battle);
      socket.join(battle.id);
      emitBattlesUpdate();

      ack?.({ ok: true, battle: publicBattleView(battle) });
    } catch (err) {
      console.error('createBattle error:', err);
      ack?.({ ok: false, error: 'Failed to create battle' });
    }
  });

  // Join an existing battle
  socket.on('joinBattle', ({ battleId, name }, ack) => {
    try {
      const b = battles.get(String(battleId || '').trim());
      if (!b) return ack?.({ ok: false, error: 'Battle not found' });

      if (b.status !== 'waiting')
        return ack?.({ ok: false, error: 'Battle already started' });

      if (b.players.some((p) => p.id === socket.id)) {
        // already in
        socket.join(b.id);
        return ack?.({ ok: true, battle: publicBattleView(b) });
      }

      if (b.players.length >= b.maxPlayers) {
        return ack?.({ ok: false, error: 'Battle is full' });
      }

      b.players.push({
        id: socket.id,
        name: name?.trim() || `Player-${socket.id.slice(0, 4)}`,
      });

      socket.join(b.id);
      emitBattlesUpdate();

      ack?.({ ok: true, battle: publicBattleView(b) });

      // Auto-start when full
      if (b.players.length >= b.maxPlayers) {
        startBattle(b.id);
      }
    } catch (err) {
      console.error('joinBattle error:', err);
      ack?.({ ok: false, error: 'Failed to join battle' });
    }
  });

  // Get all battles (on demand)
  socket.on('getBattles', (ack) => {
    ack?.(Array.from(battles.values()).map(publicBattleView));
  });

  // Leave battle (optional helper)
  socket.on('leaveBattle', ({ battleId }, ack) => {
    try {
      const b = battles.get(String(battleId || '').trim());
      if (!b) return ack?.({ ok: false, error: 'Battle not found' });

      b.players = b.players.filter((p) => p.id !== socket.id);
      socket.leave(b.id);

      // If waiting and now empty, cleanup
      if (b.status === 'waiting' && b.players.length === 0) {
        battles.delete(b.id);
      }

      emitBattlesUpdate();
      ack?.({ ok: true });
    } catch (err) {
      console.error('leaveBattle error:', err);
      ack?.({ ok: false, error: 'Failed to leave battle' });
    }
  });

  // Disconnect cleanup
  socket.on('disconnect', () => {
    // Remove socket from any waiting battles it was in
    for (const [id, b] of battles) {
      const before = b.players.length;
      b.players = b.players.filter((p) => p.id !== socket.id);

      if (b.players.length !== before) {
        io.to(id).emit('battleUpdated', publicBattleView(b));
        emitBattlesUpdate();
      }

      if (b.status === 'waiting') {
        cleanupBattleIfEmpty(id);
      }
    }
  });
});

// --- start server ---
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`API + WS listening on :${PORT}`);
});
