/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

const MediaQuery = css`
    @media screen and (max-width: 600px) {
        a:not(:first-child) {
            display: none;
        }
        a.icon {
            float: right;
            display: block;
        }
    }

    @media screen and (max-width: 600px) {
        .responsive {
            position: relative;
        }
        .responsive .icon {
            position: absolute;
            right: 0;
            top: 0;
        }
        .responsive a {
            float: none;
            display: block;
            text-align: left;
        }
    }
`;

const Topnav = styled('div')(MediaQuery, {
    overflow: 'hidden',
    backgroundColor: '#333'
});

const TopvarItem = styled('a')({
    float: 'left',
    display: 'block',
    color: '#f2f2f2',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
    fontSize: '17px',
    ':hover': {
        backgroundColor: '#ddd',
        color: 'black'
    },
    '.active': {
        backgroundColor: '#4CAF50'
    },
    '.icon': {
        display: 'none'
    }
});

export default function TopBar() {
    return (
        <Topnav id="myTopnav" className="topnav">
            <TopvarItem to="/">Home</TopvarItem>
            <TopvarItem to="/CreateProject">Create Project</TopvarItem>
            <TopvarItem to="/Projects">Projects</TopvarItem>
            <TopvarItem to="/Test1">Test</TopvarItem>
            <TopvarItem to="/Test2">Test</TopvarItem>
            <TopvarItem to="/Test3">Test</TopvarItem>
            <TopvarItem to="/Test4">Test</TopvarItem>
            <TopvarItem to="/Test5">Test</TopvarItem>
            <TopvarItem to="/Test6">Test</TopvarItem>
            <TopvarItem
                href="javascript:void(0);"
                className="icon"
                onClick={() => {
                    var x = document.getElementById('myTopnav');
                    if (x.className === 'topnav') {
                        x.className += ' responsive';
                    } else {
                        x.className = 'topnav';
                    }
                }}
            >
                Test
            </TopvarItem>
        </Topnav>
    );
}
