import React from "react";
import "./ExpandedTicketView.css";

const ExpandedTicketView = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="expanded-ticket-view">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h4>{ticket.id}</h4>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>

      <div className="tags">
        <span className="priority-tag">{ticket.priority}</span>
        <span className="feature-tag">{ticket.tag}</span>
      </div>

      <div className="avatar">
        <img src={ticket.avatar} alt="User Avatar" />
      </div>
    </div>
  );
};

export default ExpandedTicketView;
