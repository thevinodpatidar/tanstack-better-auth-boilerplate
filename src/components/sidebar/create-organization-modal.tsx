import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateOrganizationForm } from "@/components/create-organization-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function CreateOrganizationModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="cursor-pointer gap-2 p-2"
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex size-6 items-center justify-center rounded-md border">
            <Plus className="size-4" />
          </div>
          <span className="font-medium">Create Organization</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Manage your organization and its content
          </DialogDescription>
        </DialogHeader>
        <div className="border-none shadow-xs">
          <div className="space-y-6 p-0">
            <CreateOrganizationForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
