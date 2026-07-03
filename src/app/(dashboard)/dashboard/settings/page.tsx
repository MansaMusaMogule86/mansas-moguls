import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Panel } from "@/components/dashboard/Panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Settings"
        description="Manage your account, access, and empire preferences."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Profile">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Founder" className="border-white/10 bg-white/5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="empire@mansasmoguls.com"
                className="border-white/10 bg-white/5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                defaultValue="Mansas Moguls"
                className="border-white/10 bg-white/5"
              />
            </div>
            <Button className="bg-gold text-primary-foreground hover:bg-gold-bright">
              Save changes
            </Button>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title="Access & Role">
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Role</span>
                <Badge className="bg-gold/15 text-gold">Founder</Badge>
              </div>
              <Separator className="bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Access level</span>
                <span className="font-medium">Full empire command</span>
              </div>
              <Separator className="bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Visibility scope</span>
                <span className="font-medium">Public · Private · Stealth</span>
              </div>
            </div>
          </Panel>

          <Panel title="Preferences">
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email notifications</p>
                  <p className="text-xs text-muted-foreground">Agent runs, tasks, and messages.</p>
                </div>
                <Badge variant="outline" className="border-white/15 bg-white/5 text-emerald-400">
                  On
                </Badge>
              </div>
              <Separator className="bg-white/5" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">Luxury dark command center.</p>
                </div>
                <Badge variant="outline" className="border-white/15 bg-white/5 text-muted-foreground">
                  Dark
                </Badge>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
