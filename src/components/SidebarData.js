import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";


export const SidebarData = [
    {
        title: "Produtos",
        path: "/produtos",
        icon: <AiIcons.AiFillAppstore />,
    },
    {
        title: "Pedidos",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "Orçamento",
                path: "/orcamento",
                icon: <IoIcons.IoIosPricetag />,
            },  
            {
                title: "Geral",
                path: "/pedidos",
                icon: <IoIcons.IoIosDesktop />,
            },

        ],
    },
    {
        title: "Clientes",
        path: "/clientes",
        icon: <IoIcons.IoIosPeople />,
    },
    {
        title: "Sair",
        path: "/login",
        icon: <Io5Icons.IoExitOutline />,
    },
];
