import { Helmet } from "react-helmet-async";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Contact = () => {
  return (
    <section className="bg-gray-400 py-16 px-6 rounded-2xl my-10 min-h-screen flex items-center">
      <Helmet>
        <title>Contact Us | Marathon Management</title>
      </Helmet>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-8">Contact Us</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <MdEmail className="text-4xl mb-2" />
            <h3 className="text-xl font-semibold mb-1">Email</h3>
            <p>runfinity@gmail.com</p>
          </div>

          <div className="flex flex-col items-center">
            <MdPhone className="text-4xl mb-2" />
            <h3 className="text-xl font-semibold mb-1">Phone</h3>
            <p>+880 454478824</p>
          </div>

          <div className="flex flex-col items-center">
            <MdLocationOn className="text-4xl mb-2" />
            <h3 className="text-xl font-semibold mb-1">Location</h3>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
