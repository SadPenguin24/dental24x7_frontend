import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { updateUser } from "@/services/user.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ProfilePage({}) {
  const { user, fetchUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfileData] = useState({
    firstName: user?.firstName ?? undefined,
    lastName: user?.lastName ?? undefined,
    birthday: user?.birthday ?? undefined,
    phone: user?.phone ?? undefined,
    email: user?.email ?? undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await updateUser(profile).finally(fetchUserProfile);

      if (response) {
        setIsEditing(false);
        toast.success("Profile Updated", {
          description: `Your profile information has been updated successfully`,
        });
      }
    } catch (error) {
      toast.warning("Update Error", {
        description: `Something went wrong!`,
      });
    }
  };

  return (
    <div className="container flex items-center justify-center py-10 md:py-20">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Patient Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={profile.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={profile.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={profile.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday">Date of Birth</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full rounded justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {profile.birthday ? (
                        format(profile.birthday, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      className="bg-white"
                      mode="single"
                      selected={profile.birthday}
                      onSelect={(day) =>
                        setProfileData({ ...profile, birthday: day })
                      }
                      initialFocus
                      disabled={(date) =>
                        date < new Date() || date.getDay() === 0
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-2 text-center">
                <h3 className="text-lg font-semibold">{`${profile.firstName} ${profile.lastName}`}</h3>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Date of Birth:</span>
                  <span className="text-sm">
                    {profile.birthday ? format(profile.birthday!, "PPP") : ""}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="w-full"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
