import React, { useState, useEffect } from "react";
import { fetchTickets } from "./services/api";
import KanbanColumn from "./components/KanbanColumn";
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Priority label mapping
  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
  };

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedGroupBy = localStorage.getItem("groupBy");
    const savedSortBy = localStorage.getItem("sortBy");
    if (savedGroupBy) setGroupBy(savedGroupBy);
    if (savedSortBy) setSortBy(savedSortBy);
  }, []);

  // Save groupBy and sortBy to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  // Fetch tickets from the API
  useEffect(() => {
    const loadTickets = async () => {
      const data = await fetchTickets();
      if (data) setTickets(data.tickets);
    };
    loadTickets();
  }, []);

  // Grouping and Sorting Logic
  const getGroupedTickets = () => {
    const grouped = tickets.reduce((acc, ticket) => {
      let key;
      if (groupBy === "priority") {
        key = priorityLabels[ticket.priority];
      } else if (groupBy === "user") {
        key = ticket.userId || "Unknown User";
      } else {
        key = ticket[groupBy];
      }

      acc[key] = acc[key] ? [...acc[key], ticket] : [ticket];
      return acc;
    }, {});

    Object.values(grouped).forEach((group) => {
      group.sort((a, b) => {
        if (sortBy === "priority") return b.priority - a.priority;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    });

    return grouped;
  };

  const groupedTickets = getGroupedTickets();

  // Click handlers for Add and Options buttons
  const handleAddClick = (group) => {
    console.log(`Add task for ${group}`);
    // Implementation for adding a new task goes here
  };

  const handleOptionsClick = (group) => {
    console.log(`Options for ${group}`);
    // Implementation for options menu goes here
  };

  return (
    <div className="app">
      <div className="controls">
        <div className="dropdown">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="dropdown-button"
          >
            Display Options
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-section">
                <label>Group By:</label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-section">
                <label>Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <div key={key} className="kanban-column">
            <div className="kanban-column-header">
              <h3>{key}</h3>
              <button
                onClick={() => handleAddClick(key)}
                className="add-button"
              >
                +
              </button>
              <button
                onClick={() => handleOptionsClick(key)}
                className="options-button"
              >
                ...
              </button>
            </div>
            <KanbanColumn tickets={tickets} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
