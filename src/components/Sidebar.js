import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTruck,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiCamera,
  FiSettings,
} from "react-icons/fi";
import { BsCardChecklist } from "react-icons/bs";

import { FaChevronDown, FaUsers, FaWrench } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import ParcPage from "./Parc";
import HomePage from "./Home";
import Scans from "./Scans";
import Pannes from "./Pannes";
import Agents from "./Agents";
import ParcDetails from "./ParcDetails";
import { useAuth } from "../providers/AuthProvider";
import ParametrageCheckList from "./ParametrageCheckList";

// Link items for the sidebar
const LinkItems = [
  { name: "Tableau de bord", icon: FiHome, path: "/" },
  { name: "Parc", icon: FiTruck, path: "/parc" },
  { name: "Suivi des scans", icon: FiCamera, path: "/scans" },
  { name: "Pannes", icon: FaWrench, path: "/pannes" },
  { name: "Liste des agents", icon: FaUsers, path: "/agents" },

  // Add more items as needed
];

const paramsList = [
  {
    name: "Checklist",
    icon: BsCardChecklist,
    path: "/params/checklist",
  },
];

const SidebarContent = ({ onClose, user, ...rest }) => {
  const location = useLocation();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Image
          width="220px" // Set the width
          height="auto"
          src="http://parcv1.arma.ma/Web/images/shared/logo-full.png"
        ></Image>
      </Link>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {user.fullname}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          onClick={onClose}
          key={link.name}
          icon={link.icon}
          path={link.path}
          isActive={location.pathname === link.path}
        >
          {link.name}
        </NavItem>
      ))}
      <Flex
        align="center"
        // p="4"
        mt={"4"}
        mb={"4"}
        mx="4"
        color={"cyan.400"}
        // borderRadius="lg"
      >
        <HStack>
          <FiSettings mr="4" />
          <Text>Parametrages</Text>
        </HStack>
      </Flex>
      {paramsList.map((link) => (
        <NavItem
          onClick={onClose}
          key={link.name}
          icon={link.icon}
          path={link.path}
          isActive={location.pathname === link.path}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, isActive, onClick, ...rest }) => {
  return (
    <Link onClick={onClick} to={path} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        // borderRadius="lg"
        role="group"
        cursor="pointer"
        // bg={isActive ? "cyan.400" : "transparent"}
        // color={isActive ? "white" : "inherit"}
        _hover={{ color: "cyan.400" }}
        borderLeft={isActive ? "4px solid" : "4px solid transparent"}
        borderColor={isActive ? "cyan.400" : "transparent"}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "cyan.400" }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, user, logout }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {user.fullname}
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={"https://avatar.iran.liara.run/public/25"}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.login}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.fullname}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              {/* <MenuDivider /> */}
              <MenuItem onClick={logout}>Se déconnecter</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        user={user}
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} user={user} />
        </DrawerContent>
      </Drawer>
      {/* Mobile navigation */}
      <MobileNav onOpen={onOpen} user={user} logout={logout} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="parc" element={<ParcPage userId={user.id} />} />
          <Route path="parc/:numParc" element={<ParcDetails user={user} />} />
          <Route path="scans" element={<Scans />} />
          <Route path="pannes" element={<Pannes />} />
          <Route path="agents" element={<Agents />} />
          <Route
            path="params/checklist"
            element={<ParametrageCheckList />}
          ></Route>
          {/* Add more routes as needed */}
        </Routes>
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
