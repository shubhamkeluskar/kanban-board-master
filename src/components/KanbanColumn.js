import React, { useState } from "react";
import TicketCard from "./TicketCard";
import ExpandedTicketView from "./ExpandedTicketView";
// import "./KanbanColumn.css";

const KanbanColumn = ({ title, tickets }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleCardClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseExpandedView = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="kanban-column">
      <h3>{title}</h3>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onClick={() => handleCardClick(ticket)}
        />
      ))}

      {selectedTicket && (
        <ExpandedTicketView
          ticket={selectedTicket}
          onClose={handleCloseExpandedView}
        />
      )}
    </div>
  );
};

export default KanbanColumn;
