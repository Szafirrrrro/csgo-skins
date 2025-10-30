
import CaseBattleLobby from '@/components/CaseBattle/CaseBattleLobby';
import CaseBattleNavBar from '@/components/CaseBattle/Nav/CaseBattleNavBar'
import CaseBattleFilters from '@/components/CaseBattle/Filters/CaseBattleFilters';

export default function CaseBattlePage() {
  return (
    <div>
      <CaseBattleNavBar/>
      <CaseBattleFilters/>
      <CaseBattleLobby />
    </div>
  );
}
