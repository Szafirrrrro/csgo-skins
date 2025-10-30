'use client';

import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export default function CaseBattleLobby() {
  const socket = useMemo(() => io(API_BASE, {
    withCredentials: true,
    transports: ['websocket'],
  }), []);

  const [battles, setBattles] = useState([]);     // always an array
  const [myBattle, setMyBattle] = useState(null); // null or a battle object
  const [status, setStatus]   = useState('idle');
  const [caseName, setCaseName] = useState('low-case');
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [winner, setWinner] = useState(null);

  // Helpers to unwrap payloads safely
  const asArray = (v) => Array.isArray(v) ? v : [];
  const asBattle = (v) => {
    // unwrap common shapes: { ok, battle }, { battle, winner }, or plain battle
    if (!v) return null;
    if (v.battle) return v.battle;
    if (v.ok && v.battle) return v.battle;
    return v;
  };

  useEffect(() => {
    // initial fetch of battles
    socket.emit('getBattles', (list) => setBattles(asArray(list)));

    socket.on('battlesUpdated', (list) => {
      setBattles(asArray(list));
    });

    socket.on('battleStarting', (payload) => {
      const b = asBattle(payload);
      setMyBattle(b);
      setStatus('starting');
      setWinner(null);
    });

    socket.on('battleResult', (payload) => {
      // server sends { battle, winner }
      const b = asBattle(payload);
      setMyBattle(b);
      setWinner(payload?.winner ?? null);
      setStatus('finished');
    });

    return () => {
      socket.off('battlesUpdated');
      socket.off('battleStarting');
      socket.off('battleResult');
      socket.close();
    };
  }, [socket]);

  const createBattle = () => {
    socket.emit('createBattle', { caseName, maxPlayers }, (res) => {
      if (!res?.ok) {
        alert(res?.error || 'Failed to create battle');
        return;
      }
      const b = asBattle(res);
      setMyBattle(b);
      setStatus('waiting');
      setWinner(null);
    });
  };

  const joinBattle = (id) => {
    socket.emit('joinBattle', { battleId: id }, (res) => {
      if (!res?.ok) {
        alert(res?.error || 'Failed to join battle');
        return;
      }
      const b = asBattle(res);
      setMyBattle(b);
      setStatus('waiting');
      setWinner(null);
    });
  };

  const leaveBattle = () => {
    const id = myBattle?.id;
    if (!id) {
      setMyBattle(null);
      setStatus('idle');
      setWinner(null);
      return;
    }
    socket.emit('leaveBattle', { battleId: id }, () => {
      setMyBattle(null);
      setStatus('idle');
      setWinner(null);
    });
  };

  // Safe reads with optional chaining + fallbacks
  const playerCount = myBattle?.players?.length ?? 0;
  const max = myBattle?.maxPlayers ?? 0;

  return (
    <div style={{ padding: 24, color: '#e8f2ff' }}>
      <h1 style={{ marginBottom: 16 }}>Case Battles</h1>

      {myBattle ? (
        <div
          style={{
            background: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(255,255,255,.08)',
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Battle #{myBattle.id}</h3>
          <p>Case: <b>{myBattle.caseName}</b></p>
          <p>Players: <b>{playerCount}</b> / {max}</p>
          <p>Status: <b>{status}</b></p>
          {winner && status === 'finished' && (
            <p>Winner: <b>{winner.name}</b></p>
          )}
          <button onClick={leaveBattle} style={{ marginTop: 8 }}>
            Leave battle
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.08)',
              padding: 16,
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            <h3 style={{ marginTop: 0 }}>Create Battle</h3>
            <label>
              Case name:
              <input
                style={{ marginLeft: 8 }}
                value={caseName}
                onChange={(e) => setCaseName(e.target.value)}
              />
            </label>
            <label style={{ marginLeft: 16 }}>
              Max players:
              <select
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                style={{ marginLeft: 8 }}
              >
                {[2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={createBattle}
              style={{ marginLeft: 12, padding: '6px 12px' }}
            >
              Create
            </button>
          </div>

          <div>
            <h3>Available Battles</h3>
            {battles.length === 0 && <p>No battles yet.</p>}
            {battles.map((b) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,.08)',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <span>
                  #{b.id} — {b.caseName} ({b.players?.length ?? 0}/{b.maxPlayers})
                </span>
                {b.status === 'waiting' && (
                  <button onClick={() => joinBattle(b.id)}>Join</button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
