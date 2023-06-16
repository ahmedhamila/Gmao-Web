import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Separator } from "@/components/ui/Separator";
import { Size, useWindowSize } from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BarChart3Icon,
  BinaryIcon,
  BoxIcon,
  CalendarCheckIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CalendarSearchIcon,
  ChevronDownIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  ClipboardListIcon,
  FilePlus2Icon,
  FileSpreadsheetIcon,
  LogOutIcon,
  MailQuestionIcon,
  MenuIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  PackageSearchIcon,
  PalmtreeIcon,
  PlusCircleIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  SheetIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import {
  Menu,
  MenuItem,
  Sidebar as RPSidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
interface SidebarProps {
  isCollapsed: boolean;
  CollapseSidebar: (isCollapsed: boolean) => void;
}

const MenuMagasinier = () => {
  return (
    <Menu className="max-h-screen overflow-y-auto">
      <MenuItem
        icon={<CalendarIcon size={20} strokeWidth={2.4} />}
        component={<Link to="/" />}
      >
        Dashboard
      </MenuItem>
      <Separator />
      {/* Notifications */}
      <SubMenu
        label="Notifications"
        icon={<BinaryIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarCheckIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Validation de réception
        </MenuItem>
      </SubMenu>
      {/* /Notifications */}
      <Separator />
      {/* Equipements */}
      <SubMenu
        label="Equipements"
        icon={<ShoppingCartIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Liste Piéces de rechanges
        </MenuItem>
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Demandes d'approvisionnement
        </MenuItem>
      </SubMenu>
      {/* /Equipements */}
    </Menu>
  );
};
const MenuAdministrateur = () => {
  return (
    <Menu className="max-h-screen overflow-y-auto">
      <MenuItem
        icon={<CalendarIcon size={20} strokeWidth={2.4} />}
        component={<Link to="/" />}
      >
        Dashboard
      </MenuItem>
      <Separator />
      {/* Mainttenance*/}
      <SubMenu
        label="Maintenance"
        icon={<CalendarDaysIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarIcon size={20} strokeWidth={2.4} />}
          component={<Link to="/maintenance/bon-travail" />}
        >
          Bons de travails
        </MenuItem>
        <MenuItem
          icon={<CalendarIcon size={20} strokeWidth={2.4} />}
          component={<Link to="/maintenance/bon-travail" />}
        >
          Demandes d'interventions
        </MenuItem>
      </SubMenu>
      {/* /Mainttenance */}
      <Separator />
      {/* Utilisateurs */}
      <SubMenu
        label="Utilisateurs"
        icon={<BinaryIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarCheckIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Responsables chaines-productions
        </MenuItem>
      </SubMenu>
      {/* /Utilisateurs */}
      <Separator />
      {/* Equipements */}
      <SubMenu
        label="Equipements"
        icon={<ShoppingCartIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Liste Equipements
        </MenuItem>
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Demandes d'approvisionnement
        </MenuItem>
      </SubMenu>
      {/* /Equipements */}
    </Menu>
  );
};
const MenuResponsableProduction = () => {
  return (
    <Menu className="max-h-screen overflow-y-auto">
      <MenuItem
        icon={<CalendarIcon size={20} strokeWidth={2.4} />}
        component={<Link to="/dashboard" />}
      >
        Dashboard
      </MenuItem>
      <Separator />
      {/* Mainttenance*/}
      <SubMenu
        label="Maintenance"
        icon={<CalendarDaysIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarIcon size={20} strokeWidth={2.4} />}
          component={<Link to="/maintenance/bon-travail" />}
        >
          Bons de travails
        </MenuItem>
        <MenuItem
          icon={<CalendarIcon size={20} strokeWidth={2.4} />}
          component={<Link to="/maintenance/bon-travail" />}
        >
          Demandes d'interventions
        </MenuItem>
      </SubMenu>
      {/* /Mainttenance */}
      <Separator />
      {/* Utilisateurs */}
      <SubMenu
        label="Utilisateurs"
        icon={<BinaryIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarCheckIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Responsables chaines-productions
        </MenuItem>
      </SubMenu>
      {/* /Utilisateurs */}
      <Separator />
      {/* Equipements */}
      <SubMenu
        label="Equipements"
        icon={<ShoppingCartIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Liste Equipements
        </MenuItem>
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Demandes d'approvisionnement
        </MenuItem>
      </SubMenu>
      {/* /Equipements */}
    </Menu>
  );
};
const MenuResponsableChaineProduction = () => {
  return (
    <Menu className="max-h-screen overflow-y-auto">
      <MenuItem
        icon={<CalendarIcon size={20} strokeWidth={2.4} />}
        component={<Link to="/dashboard" />}
      >
        Dashboard
      </MenuItem>
      <Separator />
      {/* Mainttenance*/}
      <SubMenu
        label="Maintenance"
        icon={<CalendarDaysIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarIcon size={20} strokeWidth={2.4} />}
          component={<Link to="/maintenance/bon-travail" />}
        >
          Demandes d'interventions
        </MenuItem>
      </SubMenu>
      {/* /Mainttenance */}
      <Separator />
      {/* Notification */}
      <SubMenu
        label="Notifications"
        icon={<BinaryIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarCheckIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Validation de reception
        </MenuItem>
      </SubMenu>
      {/* /Notification */}
      <Separator />
      {/* Equipements */}
      <SubMenu
        label="Equipements"
        icon={<ShoppingCartIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Liste Equipements
        </MenuItem>
      </SubMenu>
      {/* /Equipements */}
    </Menu>
  );
};
const MenuResponsableMaintenance = () => {
  return (
    <Menu className="max-h-screen overflow-y-auto">
      <MenuItem
        icon={<CalendarIcon size={20} strokeWidth={2.4} />}
        component={<Link to="/dashboard" />}
      >
        Dashboard
      </MenuItem>
      <Separator />
      {/* Mainttenance*/}
      <SubMenu
        label="Maintenance"
        icon={<CalendarDaysIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarIcon size={20} strokeWidth={2.4} />}
          component={<Link to="/maintenance/bon-travail" />}
        >
          Bon de travail
        </MenuItem>
      </SubMenu>
      {/* /Mainttenance */}
      <Separator />
      {/* Notification */}
      <SubMenu
        label="Notifications"
        icon={<BinaryIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarCheckIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Demande de travail
        </MenuItem>
      </SubMenu>
      {/* /Notification */}
      <Separator />
      {/* Equipements */}
      <SubMenu
        label="Equipements"
        icon={<ShoppingCartIcon size={20} strokeWidth={2.4} />}
        className="rounded-full text-xs font-semibold text-slate-700"
      >
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Liste Equipements
        </MenuItem>
        <MenuItem
          icon={<CalendarSearchIcon size={20} strokeWidth={2.4} />}
          component={<Link to={""} />}
        >
          Demande d'approvisionnement
        </MenuItem>
      </SubMenu>
      {/* /Equipements */}
    </Menu>
  );
};

const Sidebar = ({ isCollapsed, CollapseSidebar }: SidebarProps) => {
  const { userType, first_name, last_name, image, mail } = useSelector(
    (state) => state.user
  );
  const { toggleSidebar } = useProSidebar();
  const size: Size = useWindowSize();
  const navigate = useNavigate();
  const notify = (error: Boolean, msg: String) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };
  useEffect(() => {
    if (size.width && size.width <= 1024) {
      CollapseSidebar(false);
    }
  }, [size.width, CollapseSidebar]);
  const handleLogOut = () => {
    localStorage.removeItem("Token");
    notify(false, "Logged Out");
    navigate("/");
    navigate(0);
  };

  return (
    <>
      <div className="sticky top-0 flex items-center justify-between border-b bg-white p-2 lg:hidden">
        <Button
          onClick={() => toggleSidebar()}
          variant="outline"
          className="h-10 w-10 p-0"
        >
          <MenuIcon size={24} />
        </Button>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-semibold text-slate-900">
                    {last_name + " " + first_name}
                  </div>
                </div>
                <ChevronDownIcon className="text-slate-700" size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut} className="text-red-600">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {createPortal(
        <div className="fixed top-0 h-full max-h-screen flex-col justify-between">
          <RPSidebar
            width={isCollapsed ? "80px" : "300px"}
            className="h-full bg-white"
            customBreakPoint="1024px"
            defaultCollapsed={isCollapsed}
          >
            <div className="flex justify-center px-3 py-4 text-sm font-semibold text-slate-700 dark:text-slate-50">
              {isCollapsed ? (
                <Button
                  variant="secondary"
                  className="invisible h-10 w-10 p-0 lg:visible"
                  onClick={() => CollapseSidebar(false)}
                >
                  <ArrowRightIcon size={24} />
                </Button>
              ) : (
                <div className="flex w-full items-center justify-between transition-all duration-200">
                  <span>Tableau de bord</span>
                  <Button
                    variant="secondary"
                    className="invisible h-10 w-10 p-0 lg:visible"
                    onClick={() => CollapseSidebar(true)}
                  >
                    <ArrowLeftIcon size={24} />
                  </Button>
                </div>
              )}
            </div>
            <Separator />
            <div className="flex h-[calc(100%-74px)] flex-col justify-between ">
              {userType === "ResponsableMaintenance" && (
                <MenuResponsableMaintenance />
              )}
              {userType === "ResponsableChaineProduction" && (
                <MenuResponsableChaineProduction />
              )}
              {userType === "ResponsableProduction" && (
                <MenuResponsableProduction />
              )}
              {userType === "Magasinier" && <MenuMagasinier />}
              {userType === "Administrateur" && <MenuAdministrateur />}
              <div
                className={cn(
                  "mt-auto border-r transition-all duration-200",
                  isCollapsed ? "w-20" : "w-[300px]"
                )}
              >
                <Separator />
                <div
                  className={cn(
                    "flex p-3 transition-all duration-200",
                    isCollapsed ? "justify-center" : "justify-between"
                  )}
                >
                  <div className="flex items-center justify-center gap-3">
                    {!isCollapsed ? (
                      <Avatar>
                        <AvatarImage src={image} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center">
                          <div className="flex items-center justify-between space-x-2">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={image} />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <LogOutIcon className="mr-2 h-4 w-4" />
                            Se déconnecter
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {!isCollapsed && (
                      <div className="flex flex-col">
                        <div className="text-sm font-semibold text-slate-900">
                          {last_name + " " + first_name}
                        </div>
                        <p className="text-xs text-slate-400">{mail}</p>
                      </div>
                    )}
                  </div>
                  {!isCollapsed && (
                    <Button variant="ghost">
                      <LogOutIcon
                        className="h-5 w-5 text-slate-700"
                        onClick={handleLogOut}
                      />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </RPSidebar>
        </div>,
        document.body
      )}
      <Toaster />
    </>
  );
};

export default Sidebar;
