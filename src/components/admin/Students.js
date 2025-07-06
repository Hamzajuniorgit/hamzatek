     import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";


const Students = () => {

      return (
        <div>
            <div className="flex h-screen bg-gray-100">
                  <AdminSidebar />
            
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <AdminTopbar />
          <h1 className="text-2xl font-bold mb-4">Students Management</h1>
          <p>This is where the admin can manage students.</p>
          </div>
          </div>
        </div>
      );
    };
    

    
export default Students;

