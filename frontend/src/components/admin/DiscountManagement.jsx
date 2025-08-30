import { useState } from 'react';

// Dummy data for discounts
const initialDiscounts = [
  { id: 1, code: 'SUMMER25', percentage: 25, validUntil: '2025-09-30', active: true },
  { id: 2, code: 'WELCOME10', percentage: 10, validUntil: '2025-12-31', active: true },
  { id: 3, code: 'FLASH50', percentage: 50, validUntil: '2025-08-31', active: false },
];

export default function DiscountManagement() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [newDiscount, setNewDiscount] = useState({
    code: '',
    percentage: '',
    validUntil: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDiscounts([
      ...discounts,
      {
        id: discounts.length + 1,
        ...newDiscount,
        active: true,
      },
    ]);
    setNewDiscount({ code: '', percentage: '', validUntil: '' });
  };

  const toggleDiscountStatus = (id) => {
    setDiscounts(
      discounts.map((discount) =>
        discount.id === id ? { ...discount, active: !discount.active } : discount
      )
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Discount Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage discount codes for your clothing store.
          </p>
        </div>
      </div>

      {/* Add new discount form */}
      <div className="mt-8 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Discount Code
            </label>
            <input
              type="text"
              name="code"
              id="code"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={newDiscount.code}
              onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
              Discount Percentage
            </label>
            <input
              type="number"
              name="percentage"
              id="percentage"
              min="0"
              max="100"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={newDiscount.percentage}
              onChange={(e) => setNewDiscount({ ...newDiscount, percentage: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700">
              Valid Until
            </label>
            <input
              type="date"
              name="validUntil"
              id="validUntil"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={newDiscount.validUntil}
              onChange={(e) => setNewDiscount({ ...newDiscount, validUntil: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Discount
          </button>
        </form>
      </div>

      {/* Discounts list */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Code
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Percentage
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Valid Until
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {discounts.map((discount) => (
                    <tr key={discount.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {discount.code}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {discount.percentage}%
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {discount.validUntil}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            discount.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {discount.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => toggleDiscountStatus(discount.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {discount.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
