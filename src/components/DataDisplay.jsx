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
  const [solvedProblems, setSolvedProblems] = useState(new Set()); // Track solved problems

  const itemsPerPage = 20;

  const companies = Array.from(
    new Set(Object.values(dynamicData).flatMap((details) => details.slice(1)))
  ).sort((a, b) => a.localeCompare(b));

  const filteredData = Object.entries(dynamicData).filter(([url, details]) => {
    const [title, ...associatedCompanies] = details;
    const matchesTitle = title.toLowerCase().includes(search.toLowerCase());
    const matchesCompany =
      !selectedCompany || associatedCompanies.includes(selectedCompany);
    return matchesTitle && matchesCompany;
  });

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

  const handleCheckboxChange = async (questionTitle, isChecked) => {
    try {
      const response = await fetch('https://leety-server.vercel.app/api/updateSolved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionTitle, solved: isChecked }),
      });
      if (!response.ok) throw new Error('Failed to update status');
  
      // Update local state
      setSolvedProblems((prev) => {
        const updatedSet = new Set(prev);
        if (isChecked) updatedSet.add(questionTitle);
        else updatedSet.delete(questionTitle);
        return updatedSet;
      });
    } catch (error) {
      console.error('Error updating solved status:', error);
    }
  };
  

  return (
    <div className="container">
      <h1>
        <button className="fetch-button" onClick={() => console.log('Fetch Data')}>
          Fetch Latest Data
        </button>
      </h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          value={selectedCompany}
          onChange={(e) => {
            setSelectedCompany(e.target.value);
            setCurrentPage(1);
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

      {paginatedData.length > 0 ? (
        <>
          <table className="list">
            <thead>
              <tr>
                <th>Title</th>
                <th>Companies</th>
                <th>Link</th>
                <th>Solved</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(([url, details]) => {
                const isSolved = solvedProblems.has(details[0]);
                return (
                  <tr
                    key={url}
                    className={isSolved ? 'solved-row' : 'list1'}
                    style={{
                      backgroundColor: isSolved ? `#80d18e` : 'transparent',
                      color: isSolved ? 'white' : 'inherit',
                    }}
                  >
                    <td>{details[0]}</td>
                    <td>{details.slice(1).join(', ')}</td>
                    <td>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        View Problem
                      </a>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSolved}
                        onChange={(e) => handleCheckboxChange(details[0], e.target.checked)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

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
