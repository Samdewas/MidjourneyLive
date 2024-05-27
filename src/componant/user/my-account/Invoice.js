import React from 'react'
import { Link } from 'react-router-dom'
import PrivateRoute from '../../comman/Privaterouter'

const Invoice = () => {
    return (
        <>
            <PrivateRoute />
            <div className='invoiceBox main-container-dashboard'>
                <Link className="font-normal text-color-14 dark:text-white text-15 d-flex justify-start gap-3 items-center pb-3 w-full border-b border-white dark:border-color-47" to="https://www.MidJourneyfree.com/user/subscription/history">
                    <svg className="neg-transition-scale" xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.875 6C15.875 5.68934 15.6232 5.4375 15.3125 5.4375L2.0455 5.4375L5.58525 1.89775C5.80492 1.67808 5.80492 1.32192 5.58525 1.10225C5.36558 0.882582 5.00942 0.882582 4.78975 1.10225L0.289752 5.60225C0.0700827 5.82192 0.0700827 6.17808 0.289752 6.39775L4.78975 10.8977C5.00942 11.1174 5.36558 11.1174 5.58525 10.8977C5.80492 10.6781 5.80492 10.3219 5.58525 10.1023L2.0455 6.5625L15.3125 6.5625C15.6232 6.5625 15.875 6.31066 15.875 6Z" fill="currentColor"></path>
                    </svg>
                    <span>Billing History</span>
                </Link>
                <h3 className='title'>Bill details</h3>
                <hr />

                <div className="bg-white dark:bg-[#292929] rounded-xl image-list-table border border-color-DF dark:border-color-47 mt-5">
                    <div>
                        <div className="p-4">
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                <div>
                                    <div><strong className="company-name text-color-14 dark:text-white">Mid Journey Free</strong></div>
                                    <div>
                                        <span className="company-info text-color-14 dark:text-white">City Hall Park Path,
                                            Dewas</span>
                                        <span className="company-info text-color-14 dark:text-white"></span>
                                    </div>
                                    <span className="company-info text-color-14 dark:text-white">
                                        Web: <Link className="company-info-url" to="https://www.MidJourneyfree.com">https://www.MidJourneyfree.com</Link>
                                    </span>
                                </div>
                                <div>
                                    <strong className="text-color-14 dark:text-white">Bill To</strong><br />
                                    <strong className="text-color-14 dark:text-white">Emily Turner</strong><br />
                                    <strong></strong><br />
                                </div>
                                <div>
                                    <div>
                                        <strong className="text-color-14 dark:text-white">
                                            Code: ZTD8V8PVSU
                                        </strong>
                                    </div>
                                    <div className="text-color-14 dark:text-white">
                                        Billing Date : 25-01-2024
                                    </div>
                                    <div className="text-color-14 dark:text-white">
                                        Next Billing Date : 24-02-2024
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-color-14 dark:text-white">
                                    <thead className="text-xs uppercase text-color-14 dark:text-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-color-14 dark:text-white">
                                                Plan
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-color-14 dark:text-white">
                                                Billing Cycle
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-color-14 dark:text-white">
                                                Gateway
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-color-14 dark:text-white">
                                                Renewable
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-color-14 dark:text-white">
                                                Total
                                                ($)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-color-14 dark:text-white">
                                                Gold
                                            </th>
                                            <td className="px-6 py-4">
                                                Monthly
                                            </td>
                                            <td className="px-6 py-4">
                                                Paypal
                                            </td>
                                            <td className="px-6 py-4 text-color-14 dark:text-white">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                4.99
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" align="right">
                                                Discount
                                            </td>
                                            <td className="px-6 py-1">
                                                0
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colspan="4" align="right">
                                                <strong>Grand Total</strong>
                                            </td>
                                            <td className="px-6 py-1">
                                                <strong>4.99</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" align="right">Paid</td>
                                            <td className="px-6 py-1">
                                                4.99
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" align="right">
                                                <strong>Due</strong>
                                            </td>

                                            <td className="px-6 py-1">
                                                <strong>
                                                    0
                                                </strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Invoice