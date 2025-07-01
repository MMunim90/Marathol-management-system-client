import { Helmet } from "react-helmet-async";
import { FaRegFileAlt } from "react-icons/fa";

const TermsOfUse = () => {
  return (
    <section className="bg-gray-400 py-16 px-6 rounded-2xl my-10 min-h-screen">
      <Helmet>
        <title>Terms of Use | Marathon Management</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <FaRegFileAlt className="text-3xl" />
          <h2 className="text-4xl font-bold">Terms of Use</h2>
        </div>
        <p className="mb-4">
          By using our platform, you agree to follow all rules regarding registration, event participation, and community guidelines. Misuse of services, false registrations, or abusive behavior may result in account suspension.
        </p>
        <p className="mb-4">
          All content and features are for event-related purposes only. Unauthorized commercial use is prohibited. We reserve the right to modify terms at any time.
        </p>
      </div>
    </section>
  );
};

export default TermsOfUse;
