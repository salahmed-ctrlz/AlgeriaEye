"use client";

import { useState } from "react";
import { Shield, UserCog, Loader2, Check } from "lucide-react";
import { updateUserRoleAdmin } from "@/actions/admin-users";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminUserActions({ targetUserId, currentRole, adminUserId }: { targetUserId: string; currentRole: string; adminUserId: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleChange = async (newRole: 'admin' | 'owner' | 'tourist') => {
        if (newRole === currentRole) return;
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

        setIsLoading(true);
        const result = await updateUserRoleAdmin(targetUserId, newRole, adminUserId);
        setIsLoading(false);

        if (result.success) {
            toast.success(`User role updated to ${newRole}`);
        } else {
            toast.error(result.error || "Failed to update role");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    disabled={isLoading}
                    className="p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-all text-gray-500 hover:text-primary disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCog className="w-4 h-4" />}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Manage User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleRoleChange('tourist')} className="flex items-center justify-between">
                    Tourist {currentRole === 'tourist' && <Check className="w-3 h-3" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange('owner')} className="flex items-center justify-between">
                    Owner {currentRole === 'owner' && <Check className="w-3 h-3" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleChange('admin')} className="flex items-center justify-between font-bold text-purple-600">
                    Administrator {currentRole === 'admin' && <Check className="w-3 h-3 text-purple-600" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
                    Ban User (Simulation)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
