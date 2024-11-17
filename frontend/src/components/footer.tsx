import React from "react";

export default function footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by MASH1R0 company 
        </p>
      </aside>
    </footer>
  );
}
