import { Helmet } from "react-helmet-async";
import { FaUserShield } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-400 py-16 px-6 rounded-2xl my-10 min-h-screen flex items-center">
      <Helmet>
        <title>Privacy Policy | Marathon Management</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <FaUserShield className="text-3xl" />
          <h2 className="text-4xl font-bold">Privacy Policy</h2>
        </div>
        <p className="mb-4">
          We collect personal data only to manage registrations and event participation. Your data is never shared without your consent.
        </p>
        <p className="mb-4">
          We use secure technologies to protect your information. You can request data deletion or updates at any time via our support channels.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
