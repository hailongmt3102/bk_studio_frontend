import React from "react";
import { Link } from "react-router-dom";

export default function Project() {
  return (
    <div>
      <ul class="list-group">
        <Link to="/project/create" class="list-group-item border-0">
          Create report
        </Link>
        <Link to="/project/gallery" class="list-group-item border-0">
          Gallery
        </Link>
        <Link to="/project/import" class="list-group-item border-0">
          Import data
        </Link>
        <Link to="/project/templates" class="list-group-item border-0">
          {" "}
          Templates
        </Link>
      </ul>
    </div>
  );
}
