import React from "react";
import Reminders from "../reminders/Reminders";
import Nav from "../layout/Nav";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        Ciclo<span>System</span>
      </h1>
      
      <Reminders />
    </aside>
  );
};

export default Sidebar;
