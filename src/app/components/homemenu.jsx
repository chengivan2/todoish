import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./homemenu.css";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import HomeHeaderButtons from "./homeHeaderButtons";

const HomeMenu = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <HamburgerMenuIcon className="home-menu-hamburger-icon" />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content aria-label="Todoish Menu" className="AlertDialogContent">
      <AlertDialog.Title className="AlertDialogTitle">
					Todoish Menu and authentication buttons
				</AlertDialog.Title>
				<AlertDialog.Description className="AlertDialogDescription">
					This overlay contains the menu, sign out button, sign in button, sign up button and the link to the dahsboard.
				</AlertDialog.Description>
        <div className="home-menu-logo-and-cancel-container">
          <div className="home-menu-logo">
            <Image
              src="/todoishMainLogo.png"
              width={60}
              height={60}
              alt="Todoish main logo with a transparent background"
            />
          </div>

          <div className="home-menu-close-icon-container">
            <AlertDialog.Cancel asChild>
              <Cross1Icon className="home-menu-close-icon" />
            </AlertDialog.Cancel>
          </div>
        </div>

        <div className="home-menu-links-container">
          <AlertDialog.Action>
            <a href="#incomplete-tasks-card">Incomplete Tasks</a>
          </AlertDialog.Action>
          <AlertDialog.Action>
            <a href="#completed-tasks-card">Completed Tasks</a>
          </AlertDialog.Action>
          <AlertDialog.Action>
            <a href="#deleted-tasks-card">Deleted Tasks</a>
          </AlertDialog.Action>
          <AlertDialog.Action>
            <a href="#stats">Stats</a>
          </AlertDialog.Action>
        </div>

        <div className="home-header-buttons">
          <HomeHeaderButtons />
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default HomeMenu;
