import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    todayCheckins: 0,
    availablePasses: 0,
  });
  const [recentRegistrations, setRecentRegistrations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get recent registrations
      const registrationsQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "desc"),
        limit(4)
      );

      const querySnapshot = await getDocs(registrationsQuery);
      const registrations = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: `${data.fullName}`,
          email: data.email,
          time: formatDistanceToNow(data.createdAt.toDate(), {
            addSuffix: true,
          }),
          status: "approved", // You can add a status field to your users collection if needed
          company: data.company,
        };
      });

      setRecentRegistrations(registrations);

      // Get total registrations count
      const totalRegistrationsSnapshot = await getDocs(collection(db, "users"));

      // Get today's check-ins (if you have a check-ins collection)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      setStats({
        totalRegistrations: totalRegistrationsSnapshot.size,
        pendingApprovals: 0, // Update this if you implement an approval system
        todayCheckins: 0, // Update this if you implement a check-in system
        availablePasses: totalRegistrationsSnapshot.size, // Update this based on your business logic
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-display text-secondary-900">
          Dashboard Overview
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-xl transition-all duration-300 border border-secondary-100">
          <div className="flex items-center justify-between">
            <div className="bg-primary-50 p-3 rounded-xl">
              <div className="text-primary-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <span className="text-3xl font-bold text-secondary-900">
              {stats.totalRegistrations}
            </span>
          </div>
          <h3 className="mt-4 text-secondary-600 font-medium">
            Total Registrations
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-xl transition-all duration-300 border border-secondary-100">
          <div className="flex items-center justify-between">
            <div className="bg-primary-50 p-3 rounded-xl">
              <div className="text-primary-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
            </div>
            <span className="text-3xl font-bold text-secondary-900">
              {stats.todayCheckins}
            </span>
          </div>
          <h3 className="mt-4 text-secondary-600 font-medium">
            Today's Check-ins
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-xl transition-all duration-300 border border-secondary-100">
          <div className="flex items-center justify-between">
            <div className="bg-primary-50 p-3 rounded-xl">
              <div className="text-primary-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
            </div>
            <span className="text-3xl font-bold text-secondary-900">
              {stats.availablePasses}
            </span>
          </div>
          <h3 className="mt-4 text-secondary-600 font-medium">
            Available Passes
          </h3>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-secondary-900">
            Recent Registrations
          </h2>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-secondary-200">
                <th className="pb-3 text-secondary-600 font-semibold">Name</th>
                <th className="pb-3 text-secondary-600 font-semibold">
                  Company
                </th>
                <th className="pb-3 text-secondary-600 font-semibold">Email</th>
                <th className="pb-3 text-secondary-600 font-semibold">Time</th>
                <th className="pb-3 text-secondary-600 font-semibold">
                  Status
                </th>
                <th className="pb-3 text-secondary-600 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {recentRegistrations.map((registration, index) => (
                <tr key={index} className="hover:bg-secondary-50">
                  <td className="py-4 text-secondary-900">
                    {registration.name}
                  </td>
                  <td className="py-4 text-secondary-600">
                    {registration.company}
                  </td>
                  <td className="py-4 text-secondary-600">
                    {registration.email}
                  </td>
                  <td className="py-4 text-secondary-600">
                    {registration.time}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        registration.status === "approved"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {registration.status === "approved"
                        ? "Approved"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-primary-600 hover:text-primary-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
