"use client"

import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, FileTextIcon, BarChart3Icon, ClockIcon, AlertCircleIcon, FolderOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { user } = useAuth()
  const isLawyer = user?.role === "lawyer" || user?.role === "admin"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">Welcome, {user?.name || "User"}</div>
      </div>

      {isLawyer ? <LawyerDashboard /> : <ClientDashboard />}
    </div>
  )
}

function LawyerDashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileTextIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <AlertCircleIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Urgent Cases</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Hearings</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChart3Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Case Success Rate</p>
                <h3 className="text-2xl font-bold">78%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
            <CardDescription>Your most recently updated cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Smith v. Johnson",
                  type: "Civil",
                  court: "Bangalore Urban District Court",
                  date: "Updated 2 days ago",
                  urgent: true,
                },
                {
                  title: "Estate of Williams",
                  type: "Probate",
                  court: "Karnataka High Court",
                  date: "Updated 3 days ago",
                  urgent: false,
                },
                {
                  title: "Brown LLC v. Davis Corp",
                  type: "Corporate",
                  court: "Commercial Court, Bangalore",
                  date: "Updated 5 days ago",
                  urgent: false,
                },
                {
                  title: "Miller Divorce",
                  type: "Family",
                  court: "Family Court, Bangalore Urban",
                  date: "Updated 1 week ago",
                  urgent: true,
                },
              ].map((caseItem, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{caseItem.title}</p>
                      {caseItem.urgent && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {caseItem.type} • {caseItem.court}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{caseItem.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Hearings</CardTitle>
            <CardDescription>Your schedule for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Court Hearing",
                  case: "Smith v. Johnson",
                  court: "Court Hall 4, Bangalore Urban District Court",
                  date: "Today, 2:00 PM",
                },
                {
                  title: "Case Filing",
                  case: "Patel Property Dispute",
                  court: "Court Hall 2, Karnataka High Court",
                  date: "Tomorrow, 10:00 AM",
                },
                {
                  title: "Evidence Submission",
                  case: "Brown LLC v. Davis Corp",
                  court: "Court Hall 7, Commercial Court",
                  date: "Wed, 11:00 AM",
                },
                {
                  title: "Settlement Conference",
                  case: "Miller Divorce",
                  court: "Court Hall 3, Family Court",
                  date: "Fri, 3:30 PM",
                },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.case}</p>
                    <p className="text-xs text-muted-foreground">{event.court}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{event.date.split(",")[0]}</p>
                    <p className="text-sm text-muted-foreground">{event.date.split(",")[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative overflow-hidden rounded-lg border bg-background p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Case Management Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <ClockIcon className="mr-2 h-5 w-5 text-primary" />
                <span>Schedule regular client updates to maintain communication</span>
              </li>
              <li className="flex items-start">
                <FileTextIcon className="mr-2 h-5 w-5 text-primary" />
                <span>Keep case documents organized by type and date</span>
              </li>
              <li className="flex items-start">
                <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                <span>Set reminders for important deadlines and court dates</span>
              </li>
            </ul>
            <Button className="mt-2">View All Tips</Button>
          </div>
          <div className="relative hidden md:block md:col-span-2 lg:col-span-1">
            <Image
              src="/images/bg_1.jpg"
              alt="Legal workspace"
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
          <div className="relative hidden lg:block">
            <Image
              src="/images/bg_3.jpg"
              alt="Scales of justice"
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </>
  )
}

function ClientDashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileTextIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">My Cases</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Hearings</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Cases</CardTitle>
            <CardDescription>Your active legal cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Property Dispute",
                  type: "Civil",
                  court: "Bangalore Urban District Court",
                  nextHearing: "Jun 15, 2023",
                },
                {
                  title: "Insurance Claim",
                  type: "Consumer",
                  court: "Consumer Court, Bangalore",
                  nextHearing: "Jun 22, 2023",
                },
                {
                  title: "Employment Matter",
                  type: "Labor",
                  court: "Labor Court, Karnataka",
                  nextHearing: "Jul 5, 2023",
                },
              ].map((caseItem, index) => (
                <Link href={`/dashboard/cases/${index + 1}`} key={index}>
                  <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-md cursor-pointer">
                    <div>
                      <p className="font-medium">{caseItem.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {caseItem.type} • {caseItem.court}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Next Hearing</p>
                      <p className="text-sm font-medium">{caseItem.nextHearing}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled hearings and meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Court Hearing",
                  case: "Property Dispute",
                  location: "Court Hall 4, Bangalore Urban District Court",
                  date: "Jun 15, 2023",
                  time: "10:30 AM",
                },
                {
                  title: "Meeting with Lawyer",
                  case: "Insurance Claim",
                  location: "Law Office",
                  date: "Jun 10, 2023",
                  time: "2:00 PM",
                },
                {
                  title: "Document Submission",
                  case: "Employment Matter",
                  location: "Labor Court, Karnataka",
                  date: "Jun 12, 2023",
                  time: "11:00 AM",
                },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.case}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative overflow-hidden rounded-lg border bg-background p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Understanding Your Legal Process</h3>
            <p className="text-muted-foreground">
              Your lawyer is working diligently on your case. Here's what you can expect in the coming weeks:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="mr-2 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                  1
                </div>
                <span>Document review and evidence collection</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                  2
                </div>
                <span>Preparation of legal arguments</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                  3
                </div>
                <span>Court hearing and presentation of case</span>
              </li>
            </ul>
            <Button className="mt-2">Learn More</Button>
          </div>
          <div className="relative hidden md:block">
            <Image
              src="/images/bg_2.jpg"
              alt="Scales of justice"
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </>
  )
}

