import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BillingHistory = () => {
    return (
        <div className='BillingHistory_page'>
            <h3 className='title'>Billing History</h3>
            <hr />

            <div className="rounded-xl p-3 border mt-4">
                <Table responsive className="w-full">
                    <thead className="bg-light rounded-xl">
                        <tr className="rounded-lg">
                            <th className="5xl:px-[34px] px-3 py-[9px] text-left font-Figtree text-14 font-medium text-color-14 dark:text-white">
                                Plan
                            </th>
                            <th className="5xl:px-6 px-3 py-[9px] font-Figtree text-left text-14 font-medium text-color-14 dark:text-white">
                                Amount
                            </th>
                            {/* <th className="5xl:px-6 px-3 py-[9px] text-left font-Figtree text-14 font-medium text-color-14 dark:text-white hidden xl:table-cell 9xl:whitespace-nowrap whitespace-nowrap 6xl:whitespace-normal">
                                <span className="5xl:w-[74px]">Start Date</span>
                            </th>
                            <th className="5xl:px-6 px-3 py-[9px] text-left font-Figtree text-14 font-medium text-color-14 dark:text-white hidden xl:table-cell 9xl:whitespace-nowrap whitespace-nowrap 6xl:whitespace-normal">
                                <span className="5xl:w-[74px]">Expire Date</span>
                            </th> */}
                            <th className="5xl:px-6 px-3 py-[9px] text-left font-Figtree text-14 font-medium text-color-14 dark:text-white">
                                Status
                            </th>
                            <th className="5xl:px-10 px-3 py-[9px] text-right font-Figtree text-14 font-medium text-color-14 dark:text-white w-max">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-[#474746]">
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:pl-[34px] 5xl:pr-0 px-3">
                                <p className="lg:w-28 w-20 break-words">
                                    Gold
                                </p>
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40">
                                $4.99
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40 whitespace-nowrap hidden xl:table-cell">
                                25-01-2024
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40 whitespace-nowrap hidden xl:table-cell">
                                24-02-2024
                            </td>
                            <td className="text-13 font-Figtree py-[22px] font-medium 5xl:px-6 px-3 sm:w-40">
                                <p className="w-max py-1 px-2.5 rounded-md text-[#EEEEEE] bg-[#898989]">Expired</p>
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 font-medium 5xl:pr-[30px] 5xl:pl-0 px-3 bill-action-rtl">
                                <div className="d-flex sm:gap-4 gap-3.5 justify-end items-center 8xl:mr-2.5">
                                    <div className="relative">
                                        <form action="/" method="POST" className="button-need-disable">

                                            <button type="submit" className="payNowButton tooltips d-flex items-center sm:p-2 p-[7px] border dark:border-color-47 bg-white text-color-14 dark:text-white dark:bg-color-47 rounded-lg justify-center border-color-DF" disabled="">
                                                <span className="text-color-14 dark:text-white h-4 w-4">
                                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                        <path d="M8.19533 15.5252C8.58008 15.5233 8.99108 15.5216 9.23295 15.5216C9.83595 15.5216 10.3454 15.0302 10.3454 14.4486C10.3454 13.8669 9.83602 13.3755 9.23295 13.3755H8.18945C8.19058 13.7926 8.19333 15.1262 8.19533 15.5252Z" fill="currentColor"></path>
                                                        <path d="M15.2148 16.7755H16.7973L16.0097 14.6885L15.2148 16.7755Z" fill="currentColor"></path>
                                                        <path d="M27.9375 7.3125H4.0625C1.82244 7.3125 0 9.13494 0 11.375V20.625C0 22.8651 1.82244 24.6875 4.0625 24.6875H27.9375C30.1776 24.6875 32 22.8651 32 20.625V11.375C32 9.13494 30.1776 7.3125 27.9375 7.3125ZM18.767 11.4983H21.0063L22.7745 14.2064L24.5374 11.4983H26.7747L23.7126 16.2023L23.702 20.5021L21.827 20.4975L21.8376 16.2009L18.767 11.4983ZM6.3125 11.5002H9.23375C10.881 11.5002 12.2212 12.8227 12.2212 14.4482C12.2212 16.0738 10.8811 17.3963 9.23375 17.3963C8.99119 17.3963 8.57475 17.3981 8.1875 17.4V20.4998H6.3125V11.5002ZM18.2004 20.4954L17.5041 18.6503H14.4999L13.7972 20.4954H11.7908L15.2164 11.5011L16.8096 11.4995L20.2044 20.4953H18.2004V20.4954Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                                <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] pay-tooltips">Pay Now
                                                </span>
                                            </button>
                                        </form>
                                    </div>

                                    <div className="relative">
                                        <Link to='/user/invoice' className="d-flex bill-tooltips tooltips items-center border border-color-89 dark:border-color-47 text-color-14 dark:text-white bg-white dark:bg-color-47 sm:p-2 p-[7px] rounded-lg justify-center " title="View Bill">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_2387_1688)">
                                                    <path d="M7.99972 3C4.66638 3 1.81972 5.07333 0.666382 8C1.81972 10.9267 4.66638 13 7.99972 13C11.333 13 14.1797 10.9267 15.333 8C14.1797 5.07333 11.333 3 7.99972 3ZM7.99972 11.3333C6.15972 11.3333 4.66638 9.84 4.66638 8C4.66638 6.16 6.15972 4.66667 7.99972 4.66667C9.83972 4.66667 11.333 6.16 11.333 8C11.333 9.84 9.83972 11.3333 7.99972 11.3333ZM7.99972 6C6.89305 6 5.99972 6.89333 5.99972 8C5.99972 9.10667 6.89305 10 7.99972 10C9.10638 10 9.99972 9.10667 9.99972 8C9.99972 6.89333 9.10638 6 7.99972 6Z" fill="currentColor"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2387_1688">
                                                        <rect width="16" height="16" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] view-bill">View Bill
                                            </span>
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <Link className="bill-tooltips tooltips d-flex items-center sm:p-2 p-[7px] border border-color-89 dark:border-color-47 bg-white text-color-14 dark:text-white dark:bg-color-47 rounded-lg justify-center" title="Download Bill" to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_2387_1692)">
                                                    <path d="M14 6.23529H10.8571V2H6.14286V6.23529H3L8.5 11.1765L14 6.23529ZM3 12.5882V14H14V12.5882H3Z" fill="currentColor"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2387_1692">
                                                        <rect width="16" height="16" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] view-bill">Download Bill
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b dark:border-[#474746]">
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:pl-[34px] 5xl:pr-0 px-3">
                                <p className="lg:w-28 w-20 break-words">
                                    Starter Plan
                                </p>
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40">
                                $0
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40 whitespace-nowrap hidden xl:table-cell">
                                15-01-2024
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40 whitespace-nowrap hidden xl:table-cell">
                                14-02-2024
                            </td>
                            <td className="text-13 font-Figtree py-[22px] font-medium 5xl:px-6 px-3 sm:w-40">
                                <p className="w-max py-1 px-2.5 rounded-md text-[#EEEEEE] bg-[#898989]">Expired</p>
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 font-medium 5xl:pr-[30px] 5xl:pl-0 px-3 bill-action-rtl">
                                <div className="d-flex sm:gap-4 gap-3.5 justify-end items-center 8xl:mr-2.5">
                                    <div className="relative">
                                        <form action="/" method="POST" className="button-need-disable">

                                            <button type="submit" className="payNowButton tooltips d-flex items-center sm:p-2 p-[7px] border dark:border-color-47 bg-white text-color-14 dark:text-white dark:bg-color-47 rounded-lg justify-center border-color-DF" disabled="">
                                                <span className="text-color-14 dark:text-white h-4 w-4">
                                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                        <path d="M8.19533 15.5252C8.58008 15.5233 8.99108 15.5216 9.23295 15.5216C9.83595 15.5216 10.3454 15.0302 10.3454 14.4486C10.3454 13.8669 9.83602 13.3755 9.23295 13.3755H8.18945C8.19058 13.7926 8.19333 15.1262 8.19533 15.5252Z" fill="currentColor"></path>
                                                        <path d="M15.2148 16.7755H16.7973L16.0097 14.6885L15.2148 16.7755Z" fill="currentColor"></path>
                                                        <path d="M27.9375 7.3125H4.0625C1.82244 7.3125 0 9.13494 0 11.375V20.625C0 22.8651 1.82244 24.6875 4.0625 24.6875H27.9375C30.1776 24.6875 32 22.8651 32 20.625V11.375C32 9.13494 30.1776 7.3125 27.9375 7.3125ZM18.767 11.4983H21.0063L22.7745 14.2064L24.5374 11.4983H26.7747L23.7126 16.2023L23.702 20.5021L21.827 20.4975L21.8376 16.2009L18.767 11.4983ZM6.3125 11.5002H9.23375C10.881 11.5002 12.2212 12.8227 12.2212 14.4482C12.2212 16.0738 10.8811 17.3963 9.23375 17.3963C8.99119 17.3963 8.57475 17.3981 8.1875 17.4V20.4998H6.3125V11.5002ZM18.2004 20.4954L17.5041 18.6503H14.4999L13.7972 20.4954H11.7908L15.2164 11.5011L16.8096 11.4995L20.2044 20.4953H18.2004V20.4954Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                                <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] pay-tooltips">Pay Now
                                                </span>
                                            </button>
                                        </form>
                                    </div>

                                    <div className="relative">
                                    <Link to='/user/invoice' className="d-flex bill-tooltips tooltips items-center border border-color-89 dark:border-color-47 text-color-14 dark:text-white bg-white dark:bg-color-47 sm:p-2 p-[7px] rounded-lg justify-center " title="View Bill">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_2387_1688)">
                                                    <path d="M7.99972 3C4.66638 3 1.81972 5.07333 0.666382 8C1.81972 10.9267 4.66638 13 7.99972 13C11.333 13 14.1797 10.9267 15.333 8C14.1797 5.07333 11.333 3 7.99972 3ZM7.99972 11.3333C6.15972 11.3333 4.66638 9.84 4.66638 8C4.66638 6.16 6.15972 4.66667 7.99972 4.66667C9.83972 4.66667 11.333 6.16 11.333 8C11.333 9.84 9.83972 11.3333 7.99972 11.3333ZM7.99972 6C6.89305 6 5.99972 6.89333 5.99972 8C5.99972 9.10667 6.89305 10 7.99972 10C9.10638 10 9.99972 9.10667 9.99972 8C9.99972 6.89333 9.10638 6 7.99972 6Z" fill="currentColor"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2387_1688">
                                                        <rect width="16" height="16" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] view-bill">View Bill
                                            </span>
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <Link className="bill-tooltips tooltips d-flex items-center sm:p-2 p-[7px] border border-color-89 dark:border-color-47 bg-white text-color-14 dark:text-white dark:bg-color-47 rounded-lg justify-center" title="Download Bill" to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_2387_1692)">
                                                    <path d="M14 6.23529H10.8571V2H6.14286V6.23529H3L8.5 11.1765L14 6.23529ZM3 12.5882V14H14V12.5882H3Z" fill="currentColor"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2387_1692">
                                                        <rect width="16" height="16" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] view-bill">Download Bill
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b dark:border-[#474746]">
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:pl-[34px] 5xl:pr-0 px-3">
                                <p className="lg:w-28 w-20 break-words">
                                    Starter Plan
                                </p>
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40">
                                $0
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40 whitespace-nowrap hidden xl:table-cell">
                                12-01-2024
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 dark:text-white font-normal 5xl:px-6 px-3 sm:w-40 whitespace-nowrap hidden xl:table-cell">
                                13-01-2024
                            </td>
                            <td className="text-13 font-Figtree py-[22px] font-medium 5xl:px-6 px-3 sm:w-40">
                                <p className="w-max py-1 px-2.5 rounded-md text-[#EEEEEE] bg-[#898989]">Expired</p>
                            </td>
                            <td className="text-14 font-Figtree py-[22px] text-color-14 font-medium 5xl:pr-[30px] 5xl:pl-0 px-3 bill-action-rtl">
                                <div className="d-flex sm:gap-4 gap-3.5 justify-end items-center 8xl:mr-2.5">
                                    <div className="relative">
                                        <form action="/" method="POST" className="button-need-disable">

                                            <button type="submit" className="payNowButton tooltips d-flex items-center sm:p-2 p-[7px] border dark:border-color-47 bg-white text-color-14 dark:text-white dark:bg-color-47 rounded-lg justify-center border-color-DF" disabled="">
                                                <span className="text-color-14 dark:text-white h-4 w-4">
                                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                        <path d="M8.19533 15.5252C8.58008 15.5233 8.99108 15.5216 9.23295 15.5216C9.83595 15.5216 10.3454 15.0302 10.3454 14.4486C10.3454 13.8669 9.83602 13.3755 9.23295 13.3755H8.18945C8.19058 13.7926 8.19333 15.1262 8.19533 15.5252Z" fill="currentColor"></path>
                                                        <path d="M15.2148 16.7755H16.7973L16.0097 14.6885L15.2148 16.7755Z" fill="currentColor"></path>
                                                        <path d="M27.9375 7.3125H4.0625C1.82244 7.3125 0 9.13494 0 11.375V20.625C0 22.8651 1.82244 24.6875 4.0625 24.6875H27.9375C30.1776 24.6875 32 22.8651 32 20.625V11.375C32 9.13494 30.1776 7.3125 27.9375 7.3125ZM18.767 11.4983H21.0063L22.7745 14.2064L24.5374 11.4983H26.7747L23.7126 16.2023L23.702 20.5021L21.827 20.4975L21.8376 16.2009L18.767 11.4983ZM6.3125 11.5002H9.23375C10.881 11.5002 12.2212 12.8227 12.2212 14.4482C12.2212 16.0738 10.8811 17.3963 9.23375 17.3963C8.99119 17.3963 8.57475 17.3981 8.1875 17.4V20.4998H6.3125V11.5002ZM18.2004 20.4954L17.5041 18.6503H14.4999L13.7972 20.4954H11.7908L15.2164 11.5011L16.8096 11.4995L20.2044 20.4953H18.2004V20.4954Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                                <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] pay-tooltips">Pay Now
                                                </span>
                                            </button>
                                        </form>
                                    </div>
                                    <div className="relative">
                                    <Link to='/user/invoice' className="d-flex bill-tooltips tooltips items-center border border-color-89 dark:border-color-47 text-color-14 dark:text-white bg-white dark:bg-color-47 sm:p-2 p-[7px] rounded-lg justify-center " title="View Bill">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_2387_1688)">
                                                    <path d="M7.99972 3C4.66638 3 1.81972 5.07333 0.666382 8C1.81972 10.9267 4.66638 13 7.99972 13C11.333 13 14.1797 10.9267 15.333 8C14.1797 5.07333 11.333 3 7.99972 3ZM7.99972 11.3333C6.15972 11.3333 4.66638 9.84 4.66638 8C4.66638 6.16 6.15972 4.66667 7.99972 4.66667C9.83972 4.66667 11.333 6.16 11.333 8C11.333 9.84 9.83972 11.3333 7.99972 11.3333ZM7.99972 6C6.89305 6 5.99972 6.89333 5.99972 8C5.99972 9.10667 6.89305 10 7.99972 10C9.10638 10 9.99972 9.10667 9.99972 8C9.99972 6.89333 9.10638 6 7.99972 6Z" fill="currentColor"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2387_1688">
                                                        <rect width="16" height="16" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] view-bill">View Bill
                                            </span>
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <Link className="bill-tooltips tooltips d-flex items-center sm:p-2 p-[7px] border border-color-89 dark:border-color-47 bg-white text-color-14 dark:text-white dark:bg-color-47 rounded-lg justify-center" title="Download Bill" to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <g clip-path="url(#clip0_2387_1692)">
                                                    <path d="M14 6.23529H10.8571V2H6.14286V6.23529H3L8.5 11.1765L14 6.23529ZM3 12.5882V14H14V12.5882H3Z" fill="currentColor"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2387_1692">
                                                        <rect width="16" height="16" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span className="image-download-tooltip-text z-50 w-max text-white items-center font-medium text-12 text-center rounded-lg px-2.5 py-[5px] absolute z-1 top-[119%] view-bill">Download Bill
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default BillingHistory