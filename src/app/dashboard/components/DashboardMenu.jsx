import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./dashboardmenu.css";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const DashboardMenu = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <HamburgerMenuIcon className="dashboard-menu-hamburger-icon" />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">

        <div className="dashboard-menu-title-and-cancel-container">
          <AlertDialog.Title className="AlertDialogTitle">
            Todoish
          </AlertDialog.Title>

          <div className="dashboard-menu-close-icon-container">
            <AlertDialog.Cancel asChild>
              <Cross1Icon className="dashboard-menu-close-icon" />
            </AlertDialog.Cancel>
          </div>
        </div>

        <div className="dashboard-menu-links-container">
          <AlertDialog.Action><a href="#incomplete-tasks-card">Incomplete Tasks</a></AlertDialog.Action>
          <AlertDialog.Action><a href="#completed-tasks-card">Completed Tasks</a></AlertDialog.Action>
          <AlertDialog.Action><a href="#deleted-tasks-card">Deleted Tasks</a></AlertDialog.Action>
          <AlertDialog.Action><a href="#stats">Stats</a></AlertDialog.Action>
        </div>

      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default DashboardMenu;
