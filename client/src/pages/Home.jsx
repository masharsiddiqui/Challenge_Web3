import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
import axios from 'axios';

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    // Use Effect hook to get wallet balance
    useEffect(() => {
        async function fetchBalance() {
            if (user?.ethereum_wallet) {
                try {
                    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${user.ethereum_wallet}&tag=latest&apikey=FXZ9HHQF6ZURCFK9ES8C9FSDZP1BQDF1GF`)
                    setBalance(response.data.result)
                } catch (error) {
                    console.error("Error fetching balance:", error)
                }
            }
        }
        fetchBalance()
    }, [user])

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? `Ethereum balance: ${balance}` : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    )
}
