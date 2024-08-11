import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import image from "../assets/images.jpeg";
import avatar from "../assets/avat.avif";

// Custom Button Component
const Button: React.FC<{
  variant?: "outline";
  size?: "lg";
  children: React.ReactNode;
}> = ({ variant, size, children }) => {
  return (
    <button
      className={` px-10 md:px-4 md:py-2 rounded transition duration-300 ${
        variant === "outline"
          ? "border border-white text-white hover:border-t-amber-500 hover:border-r-green-500 shadow-lg hover:shadow shadow-slate-500"
          : "bg-gradient-to-r from-green-400 via-teal-500 to-amber-500  text-white hover:bg-none hover:bg-blue-600"
      } ${size === "lg" ? "text-lg py-3 px-6" : "text-sm py-2 px-4"}`}
    >
      {children}
    </button>
  );
};

// Custom Card Component
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <div className={`bg-green-100 p-2 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

// Custom CardHeader Component
const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className=" p-4 h-full lg:h-40 border-b  bg-green-400 border-gray-200">{children}</div>;
};

// Custom CardTitle Component
const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h3 className="text-2xl font-semibold mb-2">{children}</h3>;
};

// Custom CardDescription Component
const CardDescription: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <p className="text-gray-700">{children}</p>;
};

interface FeatureCardProps {
  title: string;
  description: string;
}

interface TestimonialProps {
  quote: string;
  author: string;
  image: string; 
}

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], ["0%", "30%"]);
  const featureParallax = useTransform(scrollY, [300, 600], ["0%", "20%"]);
  const testimonialsParallax = useTransform(scrollY, [600, 900], ["0%", "10%"]);
  const ctaParallax = useTransform(scrollY, [900, 1200], ["0%", "5%"]);

  return (
    <section className="flex flex-col gap-40">
      {/* Hero Section */}
      <section className="lg:min-h-screen p-4 lg:px-8 background-grid background-squares bg-slate-900">
        <motion.main
          className="  flex  flex-col gap-4 justify-center items-center mx-auto opacity-100  w-full lg:w-[76%] py-32 md:p-44 bg-slate-900"
          style={{ y: heroParallax }}
        >
          <h1 className="font-extrabold text-5xl lg:text-8xl leading-10 p-2 text-gradient z-50">
            <span>Crypto</span>Learner
          </h1>
          <h4 className="  text-xl lg:text-2xl">The Hub for Crypto Enthusiasts</h4>
          <div className="flex gap-4">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </motion.main>
      </section>

      {/* Features Section */}
      <motion.section
        className="p-8 lg:px-16 flex flex-col -mt-20 mx-10 gap-8"
        style={{ y: featureParallax }}
      >
        <h2 className="text-4xl font-bold text-center mb-6">Features</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Learn"
            description="Access curated resources to enhance your crypto knowledge with expert guides and tutorials."
          />
          <FeatureCard
            title="Track"
            description="Stay updated with real-time market trends, price alerts, and in-depth analysis."
          />

          <FeatureCard
            title="Connect"
            description="Join a vibrant community, engage in discussions, and network with fellow crypto enthusiasts."
          />
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="p-8 lg:px-16 flex flex-col justify-center items-center mx-10 gap-8"
        style={{ y: testimonialsParallax }}
      >
        <h2 className="text-4xl font-bold text-center mb-6">Testimonials</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Testimonial
            quote="CryptoLearner has completely transformed my understanding of cryptocurrency and its markets!"
            author="John Doe"
            image= {image}
          />
          <Testimonial
            quote="The resources and tools provided are incredibly helpful and easy to use. Highly recommend!"
            author="Jane Smith"
            image={avatar}
          />
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="p-8 lg:px-16 flex mb-20 flex-col items-center justify-center rounded-lg bg-amber-200 mx-10 text-slate-800 "
        style={{ y: ctaParallax }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Join Us Today</h2>
        <p className="text-center text-xl max-w-xl mb-8">
          Become a part of the CryptoLearner community and embark on your
          journey towards crypto mastery!
        </p>
        <Button size="lg">Get Started</Button>
      </motion.section>
    </section>
  );
};

// FeatureCard Component
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <Card className="  hover:shadow-2xl cursor-pointer  border-r-4 border-r-blue-600  hover:bg-green-500  transition-transform transform hover:scale-105">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

// Testimonial Component
const Testimonial: React.FC<TestimonialProps> = ({ quote, author, image }) => {
  return (
    <div className="bg-slate-700  p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 max-w-md flex items-center gap-4">
      <img
        src={image}
        alt={author}
        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
      />
      <div>
        <blockquote className="italic text-amber-50">{`"${quote}"`}</blockquote>
        <footer className="text-right mt-4 font-semibold text-white">
          - {author}
        </footer>
      </div>
    </div>
  );
};

export default Home;
