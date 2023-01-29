import React from "react";

export default function Faq() {
  return (
    <section className="mt-6">
      <h3 className="text-lg font-bold">FAQs</h3>
      <p className="text-sm font-semibold mt-3">
        What happens when I update my email address (or mobile number)?
      </p>
      <p className="text-sm mt-1">
        Your login email id (or mobile number) changes, likewise. You'll receive
        all your account related communication on your updated email address (or
        mobile number).
      </p>
      <p className="text-sm font-semibold mt-3">
        When will my eShop account be updated with the new email address (or
        mobile number)?
      </p>
      <p className="text-sm mt-1">
        It happens as soon as you confirm the verification code sent to your
        email (or mobile) and save the changes.
      </p>
      <p className="text-sm font-semibold mt-3">
        What happens to my existing eShop account when I update my email address
        (or mobile number)?
      </p>
      <p className="text-sm mt-1">
        Updating your email address (or mobile number) doesn't invalidate your
        account. Your account remains fully functional. You'll continue seeing
        your Order history, saved information and personal details.
      </p>
      <p className="text-sm font-semibold mt-3">
        Does my Seller account get affected when I update my email address?
      </p>
      <p className="text-sm mt-1">
        eShop has a 'single sign-on' policy. Any changes will reflect in your
        Seller account also.
      </p>
      <div className="mt-5">
        <span className="text-sm text-sky-600 font-semibold cursor-pointer">
          Deactivate Account
        </span>
      </div>
    </section>
  );
}
