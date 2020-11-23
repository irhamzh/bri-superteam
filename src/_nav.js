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
          name: 'Peralatan IT',
          url: '/fixed-asset/peralatan-it',
          icon: 'fa fa-angle-double-right',
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
          ],
        },
      ],
    },
    // {
    //   name: 'Pengelola Gedung',
    //   url: '/pengelola-gedung',
    //   icon: 'icon-layers',
    //   children: [
    //     {
    //       name: 'Engineer',
    //       url: '/pengelola-gedung/engineer',
    //       icon: 'fa fa-angle-double-right',
    //     },
    //     {
    //       name: 'Peralatan IT',
    //       url: '/pengelola-gedung/peralatan-it',
    //       icon: 'fa fa-angle-double-right',
    //     },
    //     {
    //       name: 'Kebersihan',
    //       url: '/pengelola-gedung/kebersihan',
    //       icon: 'fa fa-angle-double-right',
    //     },
    //     {
    //       name: 'Peralatan Kerja',
    //       url: '/pengelola-gedung/peralatan-kerja',
    //       icon: 'fa fa-angle-double-right',
    //     },
    //   ],
    // },
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
      children: [
        {
          name: 'Formasi',
          url: '/general-affair/formasi',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Data Pekerja',
          url: '/general-affair/data-pekerja',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Pengelolaan Konsumsi',
          url: '/general-affair/pengelolaan-konsumsi',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Pengelolaan Kendaraan',
          url: '/general-affair/pengelolaan-kendaraan',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Evaluasi Klinik',
          url: '/general-affair/evaluasi-klinik',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Monitor CCTV',
          url: '/general-affair/monitor-cctv',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Kegiatan Lainnya',
          url: '/general-affair/kegiatan-lain',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Aktivitas',
          url: '/general-affair/aktivitas',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Anggaran',
          url: '/general-affair/anggaran',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Persekot',
          url: '/general-affair/persekot',
          icon: 'fa fa-angle-double-right',
        },
      ],
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
    // {
    //   name: 'Account',
    //   url: '/akun',
    //   icon: 'icon-people',
    //   children: [
    //     {
    //       name: 'Role',
    //       url: '/akun/role',
    //       icon: 'fa fa-angle-double-right',
    //     },
    //     {
    //       name: 'User',
    //       url: '/akun/user',
    //       icon: 'fa fa-angle-double-right',
    //     },
    //   ],
    // },
    {
      name: 'Data Master',
      url: '/master',
      icon: 'fa fa-tasks',
      children: [
        {
          name: 'User',
          url: '/master/users',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Roles',
          url: '/master/roles',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Lantai',
          url: '/master/lantai',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Ruangan',
          url: '/master/rooms',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Gedung',
          url: '/master/gedung',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Lokasi',
          url: '/master/lokasi',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Provider',
          url: '/master/providers',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Compressor',
          url: '/master/compressor',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Pompa',
          url: '/master/pompa',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Unit Pompa',
          url: '/master/unit-pompa',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Item',
          url: '/master/item',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Water Meter',
          url: '/master/water-meter',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Rekanan',
          url: '/master/partners',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Jenis Barang',
          url: '/master/type-item',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Jenis PC',
          url: '/master/type-pc',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Jenis Gedung',
          url: '/master/building-types',
          icon: 'fa fa-angle-double-right',
        },
        {
          name: 'Jenis Ruangan',
          url: '/master/room-types',
          icon: 'fa fa-angle-double-right',
        },
      ],
    },
  ],
}
