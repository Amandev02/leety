import React, { useState } from 'react';
import '../App.css'; // Import the CSS file
import data from './data.json';
import './datadisplay.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DataDisplay = () => {
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicData, setDynamicData] = useState(data); // Store the dynamic data
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [solvedProblems, setSolvedProblems] = useState(new Set()); // Track solved problems

  const itemsPerPage = 20;

  // Extract unique companies
  const companies = Array.from(
    new Set(Object.values(dynamicData).flatMap((details) => details.slice(1)))
  ).sort((a, b) => a.localeCompare(b));

  // Fetch LeetCode solved problems by username
  const fetchLeetcodeData = async () => {
    if (!leetcodeUsername) return;
    try {
      const response = await fetch(
        `https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch LeetCode data');
      }
      const data = await response.json();
      const solved = new Set(data.solved); // Assuming API returns "solved" array
      setSolvedProblems(solved);
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
    }
  };

  // Filter Data
  const filteredData = Object.entries(dynamicData).filter(([url, details]) => {
    const [title, ...associatedCompanies] = details;
    const matchesTitle = title.toLowerCase().includes(search.toLowerCase());
    const matchesCompany =
      !selectedCompany || associatedCompanies.includes(selectedCompany);
    return matchesTitle && matchesCompany;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetch Latest Data
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const fetchedData = await response.json();
      setDynamicData(fetchedData); // Update the dynamic data state
      setCurrentPage(1); // Reset to first page
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      {/* Fetch Data and LeetCode Username Input */}

      <h1>
      <button className="fetch-button" onClick={fetchData}>
          Fetch Latest Data
        </button>
      </h1>
      <div className="fetch-controls">
       
        {/* <div className="leetcode-controls">
          <input
            type="text"
            placeholder="Enter LeetCode Username"
            value={leetcodeUsername}
            onChange={(e) => setLeetcodeUsername(e.target.value)}
          />
          <button onClick={fetchLeetcodeData}>Fetch LeetCode Data</button>
        </div> */}
      </div>

      {/* Filters */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        />

        <select
          value={selectedCompany}
          onChange={(e) => {
            setSelectedCompany(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        >
          <option value="">Filter by company</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch('');
            setSelectedCompany('');
            setCurrentPage(1);
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      {paginatedData.length > 0 ? (
        <>
          <table className="list">
            <thead>
              <tr>
                <th>Title</th>
                <th>Companies</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(([url, details]) => {
                const isSolved = solvedProblems.has(details[0]); // Check if problem is solved
                return (
                  <tr 
                    key={url}
                    className="list1"
                    // style={{
                    //   backgroundColor: isSolved ? 'green' : 'transparent',
                    //   color: isSolved ? 'white' : 'inherit',
                    // }}
                  >
                    <td>{details[0]}</td>
                    <td>{details.slice(1).join(', ')}</td>
                    <td>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        View Problem
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <ul className="page">
            <li
              className={`page__btn ${currentPage > 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeftIcon />
            </li>
            {Array.from({ length: totalPages })
              .map((_, idx) => idx + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 2
                );
              })
              .reduce((acc, page, idx, arr) => {
                if (idx > 0 && page > arr[idx - 1] + 1) {
                  acc.push('...');
                }
                acc.push(page);
                return acc;
              }, [])
              .map((page, idx) => (
                <li
                  key={idx}
                  className={`page__numbers ${
                    currentPage === page ? 'active' : ''
                  }`}
                  onClick={() => page !== '...' && handlePageChange(page)}
                >
                  {page}
                </li>
              ))}
            <li
              className={`page__btn ${currentPage < totalPages ? 'active' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRightIcon />
            </li>
          </ul>
        </>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default DataDisplay;
