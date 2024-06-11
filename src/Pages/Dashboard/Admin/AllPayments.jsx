import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { format } from 'date-fns';

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments`);
      return data;
    },
  });

  console.log(payments);

  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={``} />
        <title>All Payments || Dashboard</title>
      </Helmet>
      <div className="my-4 bg-[#333333] rounded-xl mt-12 py-4 text-center text-lg text-orange-500 font-bold">
          <h2 className="mr-2">Here Is All Surveys Payments History</h2>
        </div>

      <div className="overflow-x-auto p-4 md:p-10">
        <table className="table table-zebra">
          <thead className="text-white bg-orange-500">
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Payment Date And Time</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment?.price}$</td>
                <td>{payment?.email}</td>
                <td>{payment.transactionId}</td>
                <td>{payment?.date ? format(new Date(payment.date), 'PPpp') : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPayments;
