import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const ADMIN_SECRET_KEY = 'javuro-admin-secret';

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const [adminSecret, setAdminSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // 페이지 로드 시 로컬 스토리지에서 인증 확인
  useEffect(() => {
    const storedSecret = localStorage.getItem(ADMIN_SECRET_KEY);
    if (storedSecret) {
      setAdminSecret(storedSecret);
      setAuthenticated(true);
    }
  }, []);

  const handleAuth = async () => {
    if (!adminSecret) {
      setError('Please enter an admin secret');
      return;
    }

    try {
      // 간단한 인증 확인 - 환경 변수와 비교
      const isValid = adminSecret === import.meta.env.VITE_ADMIN_SECRET;
      
      if (isValid) {
        setAuthenticated(true);
        localStorage.setItem(ADMIN_SECRET_KEY, adminSecret);
        setError('');
      } else {
        setError('Invalid admin secret');
      }
    } catch (err) {
      setError('Authentication failed');
      console.error('Auth error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SECRET_KEY);
    setAuthenticated(false);
    setAdminSecret('');
  };

  const adminFeatures = [
    { name: 'Content Management', description: 'Manage announcements, news and blog posts', path: '/admin/posts' },
    { name: 'User Management', description: 'Manage user accounts and permissions', path: '/admin/users' },
    { name: 'System Settings', description: 'Configure system settings', path: '/admin/settings' },
  ];

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Secure administration interface for JAVURO platform management
          </p>
        </div>

        {!authenticated ? (
          <div className="max-w-md mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-[#3A86FF]/10 p-3 rounded-full">
                    <Lock className="h-6 w-6 text-[#3A86FF]" />
                  </div>
                </div>
                <CardTitle className="text-center">Admin Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter admin secret"
                      value={adminSecret}
                      onChange={(e) => setAdminSecret(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                      className="bg-black/30"
                    />
                    {error && <p className="text-destructive text-sm mt-2">{error}</p>}
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]"
                    onClick={handleAuth}
                  >
                    Authenticate
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Unauthorized access attempts are logged and monitored.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-gray-800 hover:border-[#3A86FF]/50 transition-colors duration-300"
                >
                  <CardHeader>
                    <CardTitle>{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button 
                      className="w-full"
                      onClick={() => setLocation(feature.path)}
                    >
                      Access
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}