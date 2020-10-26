export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW',
      // },
    },
    {
      title: true,
      name: 'F I T U R',
      wrapper: {
        element: '', // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
    },
    {
      name: 'Fixed Asset',
      url: '/fixed-asset',
      icon: 'icon-layers',
      children: [
        {
          name: 'Anggaran',
          url: '/fixed-asset/anggaran',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Pengadaan',
          url: '/fixed-asset/pengadaan',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Aset',
          url: '/fixed-asset/aset',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Vendor',
          url: '/fixed-asset/vendor',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Persediaan',
          url: '/fixed-asset/persediaan',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Persekot',
          url: '/fixed-asset/persekot',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Working Order',
          url: '/fixed-asset/working-order',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Peralatan IT',
          url: '/fixed-asset/peralatan-it',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Reporting',
          url: '/fixed-asset/reporting',
          icon: 'fa fa-angle-double-right',
        },
      ],
    },
    {
      name: 'Pengelola Gedung',
      url: '/pengelola-gedung',
      icon: 'icon-layers',
      children: [
        {
          name: 'Engineer',
          url: '/pengelola-gedung/engineer',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Peralatan IT',
          url: '/pengelola-gedung/peralatan-it',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Kebersihan',
          url: '/pengelola-gedung/kebersihan',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Peralatan Kerja',
          url: '/pengelola-gedung/peralatan-kerja',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Reporting',
          url: '/pengelola-gedung/reporting',
          icon: 'fa fa-angle-double-right',
        },
      ],
    },
    {
      name: 'Procurement',
      url: '/procurement',
      icon: 'icon-layers',
      children: [
        {
          name: 'Working Order',
          url: '/procurement/working-order',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Pengadaan',
          url: '/procurement/pengadaan',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Hotel',
          url: '/procurement/hotel',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Catering',
          url: '/procurement/catering',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'ATK',
          url: '/procurement/atk',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Persekot',
          url: '/procurement/persekot',
          icon: 'fa fa-angle-double-right',
        },
      ],
    },
    {
      name: 'General Affair',
      url: '/general-affair',
      icon: 'icon-layers',
    },
    {
      name: 'Financial Adm',
      url: '/financial-admin',
      icon: 'icon-layers',
    },
    {
      title: true,
      name: 'M A S T E R',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Account',
      url: '/akun',
      icon: 'icon-people',
      children: [
        {
          name: 'Role',
          url: '/akun/role',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'User',
          url: '/akun/user',
          icon: 'fa fa-angle-double-right',
        },
      ],
    },
    {
      name: 'Data Master',
      url: '/master',
      icon: 'fa fa-tasks',
      children: [
        {
          name: 'Position',
          url: '/master/position',
          icon: 'fa fa-angle-double-right',
        },
      ],
    },
  ],
}
