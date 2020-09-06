import React from "react";
import { Menu, Header, Dropdown, Search } from "semantic-ui-react";
import { projectData } from "../../app/api/projectOptions";
import { categoryData } from "../../app/api/categoryOptions";

export default function Filter() {
  return (
    <>
      <Menu vertical size='large' style={{ width: "100%" }}>
        <Header icon='filter' attached color='violet' content='Filters' />
        <Menu.Item>
          <Search icon='search' placeholder='Search name' />
        </Menu.Item>
        <Menu.Item>
          <Search icon='search' placeholder='Search team leader' />
        </Menu.Item>
        <Menu.Item>
          <Search icon='search' placeholder='Search position' />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            button
            className='icon'
            floating
            labeled
            icon='sort'
            options={projectData}
            search
            text='Select by Project'
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            button
            className='icon'
            floating
            labeled
            icon='sort'
            options={categoryData}
            search
            text='Select by Specialization'
          />
        </Menu.Item>
      </Menu>
    </>
  );
}
