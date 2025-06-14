import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <PageLayout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Unlock Your <span className="text-primary-500">Academic Potential</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Connect with expert coaches, track your progress, and achieve your educational goals with our comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg animate-fade-in">
              <img
                src="https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg"
                alt="Student learning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-card rounded-xl my-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose EduConnect?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg animate-slide-up">
              <div className="p-4 bg-primary-500/10 rounded-full mb-6">
                <BookOpen className="h-10 w-10 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Learning</h3>
              <p className="text-gray-300">
                Customized educational plans tailored to your unique learning style and academic goals.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="p-4 bg-primary-500/10 rounded-full mb-6">
                <Users className="h-10 w-10 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Coaches</h3>
              <p className="text-gray-300">
                Connect with experienced educators who can guide you through complex subjects and boost your performance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="p-4 bg-primary-500/10 rounded-full mb-6">
                <Award className="h-10 w-10 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-gray-300">
                Monitor your academic improvement with detailed analytics and milestone tracking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HomePage;