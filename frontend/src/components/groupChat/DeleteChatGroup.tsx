import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { GROUP_CHAT_URL } from "@/lib/apiEndPoints";

import { toast } from "sonner";
import { clearCache } from "@/actions/common";

export default function DeleteChatGroup({
  open,
  setOpen,
  groupId,
  token
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: string;
  token: string;
}) {
  const [loading, setLoading] = useState(false);
  const deleteChatGroup = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${GROUP_CHAT_URL}/${groupId}`, {
        headers: {
          Authorization: token
        }
      });
      if (data?.message) {
        clearCache("dashboard");
        toast.success(data?.message);
        setOpen(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Somethign went wrong.please try again later.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your chat
            group and it&apos;s conversations.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={deleteChatGroup}>
            {loading ? "Processing.." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
