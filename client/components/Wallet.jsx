import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import NewWalletModal from "./Modals/newWallet";
import DepositModal from "./Modals/Deposit";
import PaymentModal from "./Modals/Payment";
import EditWageModal from "./Modals/editWage";

const Wallet = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [wallet, setWallet] = useState([]);
  const [showNewWalletModal, setShowNewWalletModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditWageModal, setShowEditWageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showNewWallet = () => {
    setShowNewWalletModal(true);
  };

  const showDeposit = () => {
    setShowDepositModal(true);
  };

  const showPayment = () => {
    setShowPaymentModal(true);
  };

  const showEditWage = () => {
    setShowEditWageModal(true);
  };

  //updating wallets from modals
  const handleWalletUpdate = (updatedWallet) => {
    if (updatedWallet && updatedWallet._id) {
      setWallet((prevWallets) =>
        prevWallets.map((wallet) =>
          wallet._id === updatedWallet._id ? updatedWallet : wallet
        )
      );
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get("http://localhost:8000/api/user/" + userId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("errori " + err);
      });

    axios
      .get("http://localhost:8000/api/wallets/" + userId)
      .then((res) => {
        setWallet(res.data.wallets);
      })
      .catch((err) => {
        console.log("errori " + err);
      });
  }, [handleWalletUpdate]);

  const logOut = () => {
    setIsLoading(true);
    console.log("logging out");
    axios
      .post(
        "http://localhost:8000/api/logout",
        {},
        { withCredentials: "same-origin" }
      )
      .then((e) => {
        localStorage.removeItem("userId");
        router.push("/");
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading ? "Loading..." : null}
      <div className="py-3 px-3 d-flex justify-between flex-wrap">
        <h4>Welcome, {user ? user.firstName : "Guest"}!</h4>
        <div className="">
          <button
            type="button"
            className="btn btn-secondary ml-3"
            onClick={(e) => {
              showNewWallet(e);
            }}
          >
            Add another wallet
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-3"
            onClick={(e) => {
              showDeposit(e);
            }}
          >
            Deposit
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-3"
            onClick={(e) => {
              showPayment(e);
            }}
          >
            Payment
          </button>
          <button
            type="button"
            className="btn btn-danger ml-3"
            onClick={logOut}
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="wallets-container d-flex justify-content-between py-3">
        {wallet.length > 0 ? (
          wallet.map((wallet, index) => (
            <div
              key={index}
              className="wallet row d-flex flex-column align-items-center justify-content-center text-center px-3 py-3 col-md-3"
            >
              <img
                src="/wallet.png"
                alt="Driver"
                style={{ width: "150px", height: "150px" }}
              />
              <div className="px-2 py-3">
                <div className="font-bold text-l mb-2">{wallet.name}</div>
                <p className="text-gray-700 text-base">
                  {wallet.balance} {wallet.currency}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%", height: "100%" }}
          >
            <h3>There are no wallets</h3>
          </div>
        )}
      </div>
      <div>
        <Link href="/transactions">
          <button type="button" className="btn btn-light ml-3">
            Transactions History
          </button>
        </Link>

        <button
          type="button"
          className="btn btn-light ml-3"
          onClick={(e) => {
            showEditWage(e);
          }}
        >
          Edit your wage
        </button>
      </div>
      <NewWalletModal
        showNewWalletModal={showNewWalletModal}
        setShowNewWalletModal={setShowNewWalletModal}
        onUpdate={handleWalletUpdate}
      />
      <DepositModal
        showDepositModal={showDepositModal}
        setShowDepositModal={setShowDepositModal}
        onUpdate={handleWalletUpdate}
      />
      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        onUpdate={handleWalletUpdate}
      />
      <EditWageModal
        showEditWageModal={showEditWageModal}
        setShowEditWageModal={setShowEditWageModal}
      />
    </div>
  );
};

export default Wallet;
