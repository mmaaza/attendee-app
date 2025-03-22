import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  startAfter,
  limit,
} from "firebase/firestore";
import { format, formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-secondary-900/75 transition-opacity"></div>

      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-error/10 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-xl font-semibold leading-6 text-secondary-900">
                  Confirm Deletion
                </h3>
                <div className="mt-2">
                  <p className="text-base text-secondary-600">
                    {itemCount === 1
                      ? "Are you sure you want to delete this registration? This action cannot be undone."
                      : `Are you sure you want to delete ${itemCount} registrations? This action cannot be undone.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-secondary-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex w-full justify-center rounded-xl bg-error px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-error/90 sm:ml-3 sm:w-auto transition-colors duration-300"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-xl border border-secondary-300 bg-white px-6 py-3 text-sm font-medium text-secondary-700 shadow-sm hover:bg-secondary-50 sm:mt-0 sm:w-auto transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegistrations, setSelectedRegistrations] = useState([]);
  const pageSize = 10;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async (searchAfter = null) => {
    setLoading(true);
    try {
      let registrationsQuery;
      // Base query
      let baseQuery = query(
        collection(db, "users"),
        orderBy("createdAt", "desc")
      );

      // Add pagination
      if (searchAfter) {
        registrationsQuery = query(
          baseQuery,
          startAfter(searchAfter),
          limit(pageSize)
        );
      } else {
        registrationsQuery = query(baseQuery, limit(pageSize));
      }

      const querySnapshot = await getDocs(registrationsQuery);
      
      // Check if we have more results
      setHasMore(querySnapshot.docs.length === pageSize);
      
      // Save the last document for pagination
      if (querySnapshot.docs.length > 0) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        setLastVisible(null);
      }

      // Format the data
      const registrationsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.fullName,
          email: data.email,
          company: data.company || "N/A",
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          formattedCreatedAt: data.createdAt 
            ? formatDistanceToNow(data.createdAt.toDate(), { addSuffix: true })
            : "Unknown",
          phone: data.phone || "N/A",
        };
      });

      // If loading more, append data; otherwise, replace
      if (searchAfter) {
        setRegistrations((prev) => [...prev, ...registrationsData]);
      } else {
        setRegistrations(registrationsData);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (lastVisible) {
      fetchRegistrations(lastVisible);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Reset pagination when searching
    setLastVisible(null);
    fetchRegistrations();
  };

  const toggleSelectRegistration = (id) => {
    setSelectedRegistrations((prev) => {
      if (prev.includes(id)) {
        return prev.filter((regId) => regId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectAllRegistrations = () => {
    if (selectedRegistrations.length === registrations.length) {
      setSelectedRegistrations([]);
    } else {
      setSelectedRegistrations(registrations.map((reg) => reg.id));
    }
  };

  const handleDelete = async (id) => {
    setItemsToDelete([id]);
    setDeleteModalOpen(true);
  };

  const handleBulkDelete = async () => {
    if (selectedRegistrations.length === 0) return;
    setItemsToDelete(selectedRegistrations);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const loadingToast = toast.loading(
        `Deleting ${itemsToDelete.length} registration${itemsToDelete.length > 1 ? 's' : ''}...`
      );

      const promises = itemsToDelete.map(id => {
        const docRef = doc(db, "users", id);
        return deleteDoc(docRef);
      });

      await Promise.all(promises);

      // Update local state
      setRegistrations((prev) =>
        prev.filter((reg) => !itemsToDelete.includes(reg.id))
      );

      // Clear selection if bulk delete
      if (itemsToDelete.length > 1) {
        setSelectedRegistrations([]);
      }

      toast.dismiss(loadingToast);
      toast.success(
        `${itemsToDelete.length} registration${itemsToDelete.length > 1 ? 's' : ''} deleted`
      );
      setDeleteModalOpen(false);
      setItemsToDelete([]);
    } catch (error) {
      console.error("Error deleting registration(s):", error);
      toast.error("Failed to delete registration(s)");
    }
  };

  const handleExport = () => {
    // Sample export functionality
    const dataToExport = registrations.map(reg => ({
      Name: reg.name,
      Email: reg.email,
      Company: reg.company,
      Phone: reg.phone,
      "Registration Date": format(reg.createdAt, "PPP")
    }));
    
    console.log("Exporting data:", dataToExport);
    toast.success("Export started");
  };

  const filteredRegistrations = searchTerm 
    ? registrations.filter(reg => 
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : registrations;

  // Loading skeleton
  const TableSkeleton = () => (
    <div className="animate-pulse">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="h-16 bg-secondary-100 rounded-md mb-2"></div>
      ))}
    </div>
  );

  return (
    <div className="space-y-mobile-gap md:space-y-tablet-gap lg:space-y-desktop-gap">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-h2 md:text-3xl lg:text-4xl font-bold font-display text-secondary-900">
          Registrations
        </h1>
        <div className="w-full sm:w-auto">
          <button
            onClick={handleExport}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 text-white rounded-xl shadow-lg hover:bg-primary-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-card p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                placeholder="Search by name, email or company..."
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-secondary-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 sm:px-4 py-2.5 sm:py-3 bg-primary-600 text-white rounded-r-xl hover:bg-primary-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        {/* Selected Actions */}
        {selectedRegistrations.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-secondary-50 p-3 sm:p-4 rounded-lg">
            <span className="text-sm sm:text-base text-secondary-700 font-medium">
              {selectedRegistrations.length} registrations selected
            </span>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleBulkDelete}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors font-medium flex items-center justify-center gap-1 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedRegistrations([])}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-300 transition-colors font-medium text-sm sm:text-base"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Registrations Table */}
      <div className="bg-white rounded-xl shadow-card p-3 sm:p-6">
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          {loading && registrations.length === 0 ? (
            <TableSkeleton />
          ) : (
            <>
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-secondary-200">
                    <thead>
                      <tr className="text-left">
                        <th scope="col" className="px-3 sm:pl-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRegistrations.length === registrations.length && registrations.length > 0}
                            onChange={selectAllRegistrations}
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-secondary-700">
                          Name
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-secondary-700 hidden sm:table-cell">
                          Email
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-secondary-700 hidden md:table-cell">
                          Company
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-secondary-700 hidden lg:table-cell">
                          Registered
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-secondary-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-100">
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="px-3 sm:px-4 py-8 text-center text-sm sm:text-base text-secondary-600">
                            No registrations found
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map((registration) => (
                          <tr key={registration.id} className="hover:bg-secondary-50 transition-colors">
                            <td className="px-3 sm:pl-4 py-3 sm:py-4">
                              <input
                                type="checkbox"
                                checked={selectedRegistrations.includes(registration.id)}
                                onChange={() => toggleSelectRegistration(registration.id)}
                                className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                              />
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                <span className="text-sm sm:text-base font-medium text-secondary-900">
                                  {registration.name}
                                </span>
                                <span className="text-xs text-secondary-600 sm:hidden">
                                  {registration.email}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell text-sm sm:text-base text-secondary-600">
                              {registration.email}
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 hidden md:table-cell text-sm sm:text-base text-secondary-600">
                              {registration.company}
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 hidden lg:table-cell text-sm sm:text-base text-secondary-600">
                              <span title={format(registration.createdAt, "PPP p")}>
                                {registration.formattedCreatedAt}
                              </span>
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  className="text-primary-600 hover:text-primary-700 transition-colors p-1 sm:p-2"
                                  title="View Details"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDelete(registration.id)}
                                  className="text-secondary-600 hover:text-error transition-colors p-1 sm:p-2"
                                  title="Delete"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Pagination */}
              {hasMore && (
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <button
                    onClick={loadMore}
                    disabled={loading || !hasMore}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border-2 border-primary-600 text-primary-700 hover:bg-primary-50 transition-colors duration-300 font-medium text-sm sm:text-base ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemCount={itemsToDelete.length}
      />
    </div>
  );
};

export default RegistrationsPage;