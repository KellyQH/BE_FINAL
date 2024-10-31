import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Drawer from '../components/Drawer';
import teacherService from '../services/teacherService';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    fetchTeachers(currentPage);
  }, [currentPage]);

  const fetchTeachers = async (page) => {
    const { data, totalPages } = await teacherService.getTeachers(page);
    setTeachers(data);
    setTotalPages(totalPages);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateTeacher = () => {
    setShowDrawer(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Teacher List</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateTeacher}
        >
          Create Teacher
        </button>
      </div>
      <Table data={teachers} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {showDrawer && <Drawer onClose={() => setShowDrawer(false)} />}
    </div>
  );
}

export default TeacherList;