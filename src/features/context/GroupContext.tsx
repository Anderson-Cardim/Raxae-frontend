import React, { createContext, useState, type ReactNode } from "react";

export type SplitType = "equally" | "custom";
export type SplitMethod = "value" | "percentage";

export type Member = {
  id: number;
  nome: string; 
  amount: number;
  contact: string;
  isManager: boolean;
  isCurrentUser: boolean;
  canDelete: boolean;
};

export type Expense = {
  description: string;
  totalValue: number;
  members: Member[];
};

export type GroupState = {
  groupImage?: FileList;
  groupName: string;
  description?: string;
  periodicity: string;
  dueDate: string;
  adminPix: string;
  members?: Member[];
  expense?: Expense;
};


export type GroupContextType = {
  group: GroupState | null;
  setGroup: (groupData: GroupState) => void;
  splitType: SplitType;
  setSplitType: (type: SplitType) => void;
  splitMethod: SplitMethod;
  setSplitMethod: (method: SplitMethod) => void;
};

const defaultGroupContextValue: GroupContextType = {
  group: null,
  setGroup: () => {},
  setSplitMethod: () => {},
  setSplitType: () => {},
  splitMethod: "value",
  splitType: "equally",
};

export const GroupContext = createContext<GroupContextType>(
  defaultGroupContextValue
);

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [group, setGroup] = useState<GroupState | null>(null);
  const [splitType, setSplitType] = useState<SplitType>("equally");
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("value");

  return (
    <GroupContext.Provider
      value={{
        group,
        setGroup,
        splitType,
        setSplitType,
        splitMethod,
        setSplitMethod,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
