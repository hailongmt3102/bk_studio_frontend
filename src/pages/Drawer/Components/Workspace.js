import React from "react";
import { Link } from "react-router-dom";

export default function Workspace() {
  return (
    <div>
      <ul class="list-group">
        <Link to="/" class="list-group-item border-0">
          Dashboard
        </Link>
        <Link to="/datasources" class="list-group-item border-0">
          Data Sources
        </Link>
        <Link to="/people" class="list-group-item border-0">
          People
        </Link>
        <Link to="/yourproject" class="list-group-item border-0">
          Your project
        </Link>
      </ul>
    </div>
  );
}
