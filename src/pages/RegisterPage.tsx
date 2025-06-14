import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus, Mail, Lock, User, BookOpen, School } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    major: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'University is required';
    }

    if (!formData.major.trim()) {
      newErrors.major = 'Major is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setSuccess('Registration successful! Redirecting to login...');

        // Reset form after successful submission
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          university: '',
          major: '',
        });
      }, 1000);
    }
  };

  return (
    <PageLayout centered>
      <div className="w-full max-w-lg py-8">
        <Card>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-gray-400">Join our community of students</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
              icon={<User className="h-5 w-5 text-gray-500" />}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              icon={<Mail className="h-5 w-5 text-gray-500" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                icon={<Lock className="h-5 w-5 text-gray-500" />}
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
                icon={<Lock className="h-5 w-5 text-gray-500" />}
              />
            </div>

            <Input
              label="University"
              type="text"
              name="university"
              id="university"
              placeholder="University of California"
              value={formData.university}
              onChange={handleChange}
              error={errors.university}
              required
              icon={<School className="h-5 w-5 text-gray-500" />}
            />

            <Input
              label="Major"
              type="text"
              name="major"
              id="major"
              placeholder="Computer Science"
              value={formData.major}
              onChange={handleChange}
              error={errors.major}
              required
              icon={<BookOpen className="h-5 w-5 text-gray-500" />}
            />

            <div className="pt-2">
              <Button type="submit" fullWidth isLoading={isLoading}>
                <UserPlus className="mr-2 h-5 w-5" />
                Register
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-400">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;