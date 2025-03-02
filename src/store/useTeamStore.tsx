import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  surname: string;
  age: number;
  teamId: string;
}

export interface Team {
  id: string;
  label: string;
  users: User[];
  showUsers?: boolean;
}

interface TeamStore {
  teams: Team[];
  addTeam: (team: Team) => void;
  addUserToTeam: (teamId: string, user: User) => void;
  removeUserFromTeam: (teamId: string, userId: string) => void;
  toggleTeamUsers: (teamId: string) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [
    {
      id: "agapazar",
      label: "agapazar",
      users: [
        {
          id: "user-1",
          name: "Hüseyin",
          surname: "Erkal",
          age: 23,
          teamId: "agapazar",
        },
        {
          id: "user-2",
          name: "noname",
          surname: "kid",
          age: 17,
          teamId: "team-1",
        },
      ],
      showUsers: true,
    },
    {
      id: "team-2",
      label: "fake it till you make it",
      users: [
        {
          id: "user-3",
          name: "hasan",
          surname: "can",
          age: 40,
          teamId: "team-2",
        },
      ],
      showUsers: true,
    },
  ],
  addTeam: (team: Team) => set((state) => ({ teams: [...state.teams, team] })),
  addUserToTeam: (teamId: string, user: User) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, users: [...team.users, user] } : team
      ),
    })),
  removeUserFromTeam: (teamId: string, userId: string) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId
          ? { ...team, users: team.users.filter((u) => u.id !== userId) }
          : team
      ),
    })),
  toggleTeamUsers: (teamId: string) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, showUsers: !team.showUsers } : team
      ),
    })),
}));
