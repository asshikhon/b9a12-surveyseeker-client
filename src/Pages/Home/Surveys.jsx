import { Helmet } from "react-helmet-async";
import logo from "../../assets/images/surveys.png";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router-dom";

const Surveys = () => {
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const axiosCommon = useAxiosCommon();

  // Fetch surveys data
  const {
    data: surveys = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["surveys", currentPage, itemsPerPage, filter, sort, search],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/all-surveys", {
        params: { page: currentPage, size: itemsPerPage, filter, sort, search },
      });
      return data.surveys;
    },
  });
  

  // Fetch count data
  const { data: countData } = useQuery({
    queryKey: ["count", filter, search],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/surveys-count", {
        params: { filter, search },
      });
      return data.count;
    },
  });

  useEffect(() => {
    if (countData !== undefined) {
      setCount(countData);
    }
  }, [countData]);

  // Calculate the number of pages
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <Helmet>
          <link rel="icon" type="image/svg+xml" href={logo} />
          <title>SurveySeeker || Surveys</title>
        </Helmet>

        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          {/* Filter dropdown */}
          <div>
            <select
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              value={filter}
              name="category"
              id="category"
              className="border p-4 rounded-lg"
            >
              <option value="">Filter By Category</option>
              <option value="Customer Satisfaction">Customer Satisfaction</option>
              <option value="Employee Feedback">Employee Feedback</option>
              <option value="Market Research">Market Research</option>
              <option value="Product Feedback">Product Feedback</option>
              <option value="Event Planning">Event Planning</option>
         
            </select>
          </div>

          {/* Search input */}
          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-orange-400 focus-within:ring-orange-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                name="search"
                placeholder="Enter Survey Title"
                aria-label="Enter Survey Title"
              />
              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-orange-500 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>

          {/* Sort dropdown */}
          <div>
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
              value={sort}
              name="sort"
              id="sort"
              className="border p-4 rounded-md"
            >
              <option className="" value="">Sort By Vote Count</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button  onClick={handleReset} className="btn  bg-orange-500 text-white">
            Reset
          </button>
          <button onClick={() => refetch()} className="btn  bg-orange-500 text-white">
            Refresh
          </button>
        </div>

        {/* Display surveys */}
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <LoadingSpinner className="text-center h-screen mx-auto block" />
          ) : (
            surveys.map((survey, index) => (
              <div  key={index} className="card h-auto text-black min-h-[270px]  bg-[#faf3e0]">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{survey.title}</h2>
                  <p>{survey.description}</p>
                  <h3 className="text-[#4682B4] text-lg ">Total Vote Count: ({survey?.voteCount || 0})</h3>
                </div>
                <Link to={`/survey/${survey?._id}`}>
                <button className="btn bg-orange-500 text-white  border-0 text-center block rounded-xl text-base mb-6 mx-auto">View Details</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-12">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-orange-500 hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="mx-1">previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-orange-500 text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-orange-500 hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-orange-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Surveys;
