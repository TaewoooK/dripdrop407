import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
import SignOutButton from "./SignOutButton";
import { fetchUserAttributes } from "aws-amplify/auth";

const NavBar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userAttributes = await fetchUserAttributes();
            console.log(userAttributes);
            setUser(userAttributes);
          } catch (error) {
            console.error("Error fetching user data: ", error);
          }
        };
    
        fetchUserData();
    }, []);

    const isUserNull = () => {
        return user ==  null ? true : false
    }

  return (
    <View className='navbar_container'>
        <Text className='logo-text'>
            <span className="blue-text">drip</span>
            <span>drop.</span>
        </Text>

        <Flex className='selections-container'>

            <Flex className='bullets-container'>
                <View className='nav-container'>
                    <a href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="rgba(255,255,255,1)"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    </a>
                </View>
                <a href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Text className='nav-text'>
                    Home
                    </Text>
                </a>
            </Flex>

            <Flex className='bullets-container'>
                <View className='nav-container'>
                        <a href="/leaderboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="rgba(255,255,255,1)"
                            className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.166 19.5L17.166 20.25C17.3649 20.25 17.5557 20.171 17.6963 20.0303C17.837 19.8897 17.916 19.6989 17.916 19.5L17.166 19.5ZM2.166 19.5L1.416 19.5C1.416 19.9142 1.75179 20.25 2.166 20.25L2.166 19.5ZM0 2.506L-0.154854 1.77216C-0.548952 1.85532 -0.806997 2.23492 -0.739345 2.63197L0 2.506ZM5.396 7.478L5.87123 6.89778L5.87076 6.8974L5.396 7.478ZM2.916 0.471L2.8113 -0.271656C2.4412 -0.219479 2.166 0.0972377 2.166 0.471L2.916 0.471ZM16.416 0.47L17.166 0.47C17.166 0.096129 16.8906 -0.220646 16.5204 -0.272696L16.416 0.47ZM13.936 7.478L13.4612 6.89739L13.4608 6.89774L13.936 7.478ZM19.332 2.506L20.0713 2.63196C20.139 2.23505 19.8811 1.85556 19.4872 1.77224L19.332 2.506ZM14.166 15.75L5.166 15.75L5.166 17.25L14.166 17.25L14.166 15.75ZM14.166 17.25C14.7627 17.25 15.335 17.4871 15.757 17.909L16.8177 16.8483C16.1144 16.1451 15.1606 15.75 14.166 15.75L14.166 17.25ZM15.757 17.909C16.1789 18.331 16.416 18.9033 16.416 19.5L17.916 19.5C17.916 18.5054 17.5209 17.5516 16.8177 16.8483L15.757 17.909ZM17.166 18.75L2.166 18.75L2.166 20.25L17.166 20.25L17.166 18.75ZM2.916 19.5C2.916 18.9033 3.15305 18.331 3.57501 17.909L2.51435 16.8483C1.81109 17.5516 1.416 18.5054 1.416 19.5L2.916 19.5ZM3.57501 17.909C3.99697 17.4871 4.56926 17.25 5.166 17.25L5.166 15.75C4.17144 15.75 3.21761 16.1451 2.51435 16.8483L3.57501 17.909ZM14.916 16.5L14.916 13.125L13.416 13.125L13.416 16.5L14.916 16.5ZM14.916 13.125C14.916 12.0902 14.0776 11.25 13.041 11.25L13.041 12.75C13.2484 12.75 13.416 12.9178 13.416 13.125L14.916 13.125ZM13.041 11.25L12.17 11.25L12.17 12.75L13.041 12.75L13.041 11.25ZM5.916 16.5L5.916 13.125L4.416 13.125L4.416 16.5L5.916 16.5ZM5.916 13.125C5.916 12.9182 6.08421 12.75 6.291 12.75L6.291 11.25C5.25579 11.25 4.416 12.0898 4.416 13.125L5.916 13.125ZM6.291 12.75L7.163 12.75L7.163 11.25L6.291 11.25L6.291 12.75ZM12.17 11.25L7.163 11.25L7.163 12.75L12.17 12.75L12.17 11.25ZM12.8191 11.6242C12.3139 10.7517 12.012 9.77661 11.9359 8.77135L10.4401 8.88465C10.5333 10.1148 10.9028 11.3082 11.5209 12.3758L12.8191 11.6242ZM7.81217 12.3756C8.42997 11.3079 8.79902 10.1145 8.89187 8.88445L7.39613 8.77155C7.32025 9.77674 7.01867 10.7519 6.51383 11.6244L7.81217 12.3756ZM2.80792 1.24383C1.8099 1.38916 0.822301 1.56596 -0.154854 1.77216L0.154854 3.23984C1.1017 3.04004 2.0581 2.86884 3.02408 2.72817L2.80792 1.24383ZM-0.739345 2.63197C-0.488487 4.10428 0.243376 5.45189 1.34173 6.46393L2.35816 5.36082C1.50378 4.57357 0.934481 3.5253 0.739345 2.38003L-0.739345 2.63197ZM1.34173 6.46393C2.44008 7.47598 3.84295 8.09536 5.33082 8.22516L5.46118 6.73084C4.3038 6.62987 3.21254 6.14807 2.35816 5.36082L1.34173 6.46393ZM2.166 1.986L2.166 2.25L3.666 2.25L3.666 1.986L2.166 1.986ZM2.166 2.25C2.166 4.59249 3.2405 6.68426 4.92124 8.0586L5.87076 6.8974C4.5235 5.79574 3.666 4.12351 3.666 2.25L2.166 2.25ZM3.666 1.986L3.666 0.471L2.166 0.471L2.166 1.986L3.666 1.986ZM3.0207 1.21366C5.19195 0.907555 7.41097 0.75 9.666 0.75L9.666 -0.75C7.34103 -0.75 5.05205 -0.587555 2.8113 -0.271656L3.0207 1.21366ZM9.666 0.75C11.922 0.75 14.1412 0.907557 16.3116 1.2127L16.5204 -0.272696C14.2808 -0.587557 11.992 -0.75 9.666 -0.75L9.666 0.75ZM15.666 0.47L15.666 1.986L17.166 1.986L17.166 0.47L15.666 0.47ZM4.92077 8.05822C5.81002 8.78656 6.85523 9.30004 7.97519 9.55876L8.31281 8.09724C7.41756 7.89044 6.58206 7.47998 5.87123 6.89778L4.92077 8.05822ZM15.666 1.986L15.666 2.25L17.166 2.25L17.166 1.986L15.666 1.986ZM15.666 2.25C15.666 4.12351 14.8085 5.79574 13.4612 6.8974L14.4108 8.0586C16.0915 6.68426 17.166 4.59249 17.166 2.25L15.666 2.25ZM16.308 2.72818C17.2695 2.86808 18.2262 3.0387 19.1768 3.23976L19.4872 1.77224C18.5054 1.56455 17.5171 1.38832 16.524 1.24382L16.308 2.72818ZM18.5927 2.38004C18.3976 3.52518 17.8284 4.57335 16.9742 5.36058L17.9907 6.4636C19.0888 5.45157 19.8205 4.10409 20.0713 2.63196L18.5927 2.38004ZM16.9742 5.36058C16.1201 6.1477 15.0281 6.62968 13.8707 6.73085L14.0013 8.22515C15.4888 8.09513 16.8925 7.47574 17.9907 6.4636L16.9742 5.36058ZM13.4608 6.89774C12.7496 7.48021 11.9147 7.89058 11.0193 8.09721L11.3567 9.55879C12.4772 9.30019 13.5218 8.78661 14.4112 8.05826L13.4608 6.89774ZM11.0194 8.09719C10.1288 8.3026 9.20316 8.3026 8.31256 8.09719L7.97544 9.55881C9.08788 9.8154 10.2441 9.8154 11.3566 9.55881L11.0194 8.09719Z" />
                        </svg>
                        </a>
                </View>
                    <a href="/leaderboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Text className='nav-text'>
                        Leaderboard
                        </Text>
                    </a>
            </Flex>

            <Flex className='bullets-container'>
                <View className='nav-container'>
                    <a href="/upload" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="rgba(255,255,255,1)"
                        className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    </a>
                </View>
                <a href="/upload" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Text className='nav-text'>
                    Upload
                    </Text>
                </a>
            </Flex>

            <Flex className='bullets-container'>
                <View className='nav-container'>
                    <a href="/activity" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="rgba(255,255,255,1)"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>

                    </a>
                </View>
                <a href="/activity" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Text className='nav-text'>
                    Activity
                    </Text>
                </a>
            </Flex>

            <Flex className='bullets-container'>
                <View className='nav-container'>
                    <a href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="rgba(255,255,255,1)"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    </a>
                </View>
                <a href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Text className='nav-text'>
                    Profile
                    </Text>
                </a>
            </Flex>

            <Flex className='bullets-container'>
                <View className='nav-container'>
                    <a href="/Friends" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="rgba(255,255,255,1)"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    
                    </a>
                </View>
                <a href="/Friends" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Text className='nav-text'>
                    Friends
                    </Text>
                </a>
            </Flex>
        </Flex>

        <Flex className='signout-container'>
            <SignOutButton></SignOutButton>
        </Flex>

        <View className='arrow-icon'>
            <Icon
            width="13.5px"
            height="15px"
            viewBox={{ minX: 0, minY: 0, width: 13.5, height: 15 }}
            paths={[
                {
                d: "M14.0303 0.53033C14.3232 0.237437 14.3232 -0.237437 14.0303 -0.53033C13.7374 -0.823223 13.2626 -0.823223 12.9697 -0.53033L14.0303 0.53033ZM6 7.5L5.46967 6.96967C5.17678 7.26256 5.17678 7.73744 5.46967 8.03033L6 7.5ZM12.9697 15.5303C13.2626 15.8232 13.7374 15.8232 14.0303 15.5303C14.3232 15.2374 14.3232 14.7626 14.0303 14.4697L12.9697 15.5303ZM8.03033 0.53033C8.32322 0.237437 8.32322 -0.237437 8.03033 -0.53033C7.73744 -0.823223 7.26256 -0.823223 6.96967 -0.53033L8.03033 0.53033ZM0 7.5L-0.53033 6.96967C-0.823223 7.26256 -0.823223 7.73744 -0.53033 8.03033L0 7.5ZM6.96967 15.5303C7.26256 15.8232 7.73744 15.8232 8.03033 15.5303C8.32322 15.2374 8.32322 14.7626 8.03033 14.4697L6.96967 15.5303ZM12.9697 -0.53033L5.46967 6.96967L6.53033 8.03033L14.0303 0.53033L12.9697 -0.53033ZM5.46967 8.03033L12.9697 15.5303L14.0303 14.4697L6.53033 6.96967L5.46967 8.03033ZM6.96967 -0.53033L-0.53033 6.96967L0.53033 8.03033L8.03033 0.53033L6.96967 -0.53033ZM-0.53033 8.03033L6.96967 15.5303L8.03033 14.4697L0.53033 6.96967L-0.53033 8.03033Z",
                stroke: "rgba(255,255,255,1)",
                fillRule: "nonzero",
                strokeLinejoin: "round",
                strokeWidth: 1,
                },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="18.75%"
            bottom="18.75%"
            left="21.88%"
            right="21.88%"
            ></Icon>
        </View>

        <Flex className='user-container'>
            <Icon
            width="48px"
            height="48px"
            viewBox={{ minX: 0, minY: 0, width: 48, height: 48 }}
            paths={[
                {
                d: "M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z",
                fill: "rgba(217,217,217,1)",
                fillRule: "nonzero",
                },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            position="relative"
            ></Icon>
            <Text className='username'>
                {isUserNull() ? (<p>Username</p>) : user.email.split('@')[0]}
                
            </Text>
        </Flex>

    </View>
  )
}

export default NavBar