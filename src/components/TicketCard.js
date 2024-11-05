import React from "react";
import "./TicketCard.css";

const TicketCard = ({ ticket, onClick }) => {
  return (
    <div className="ticket-card" onClick={onClick}>
      <div className="ticket-header">
        <h4>{ticket.id}</h4>
        <img src={ticket.avatar} alt="Avatar" className="avatar-icon" />
      </div>
      <h3>{ticket.title}</h3>
      {ticket.tag === "Feature Request" && (
        <span className="feature-request-tag">Feature Request</span>
      )}
    </div>
  );
};

export default TicketCard;
