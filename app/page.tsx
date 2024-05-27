'use client';
import Image from 'next/image';
import styles from './page.module.css';
import axios from 'axios';
import { JSX, useEffect, useState, Fragment } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
//@ts-ignore
import { decode } from 'content-hash';
import Chains from '@/chains/chainsEns.json';

type AddressObj = {
  [key: string]: string;
};

type Item = {
  _id: string;
  node: string;
  text: { [key: string]: string };
  contenthash: string;
  address: { [key: string]: string };
};

const textType = [
  'email',
  'avatar',
  'description',
  'display',
  'email',
  'keywords',
  'mail',
  'notice',
  'location',
  'phone',
  'url',
];

const apiUrl = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL + '/api'
  : './api';

type AddressRecord = {
  coinType: number;
  address: string;
};

type TextRecord = {
  type: string;
  value: string;
  id: number;
};

export default function Home() {
  const [f5, setF5] = useState(0);
  const [node, setNode] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [show, setShow] = useState(false);
  const [addresses, setAddresses] = useState<AddressRecord[]>([
    { coinType: Chains[0].coinType, address: '' },
  ]);
  const [textes, setTextes] = useState<TextRecord[]>([
    {
      type: textType[0],
      value: '',
      id: Math.ceil(Math.random() * 22),
    },
  ]);
  const [contenthash, setContenthash] = useState('');
  const [updateId, setUpdateId] = useState('');

  useEffect(() => {
    ~(async function () {
      try {
        const res = await axios.get(`${apiUrl}/list`);
        if (res.data && res.data.data) {
          setItems(res.data.data);
        }
      } catch (e) {
        console.log(e, 'error');
      }
    })();
  }, [f5]);

  const toggleModel = () => {
    setShow((v) => !v);
  };

  const handleChangeNode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNode(event.target.value);
  };

  const handleChangeChainItem = (
    event: SelectChangeEvent<number | string>,
    index: number
  ) => {
    const tmp = [...addresses];
    tmp[index].coinType = Number(event.target.value);
    setAddresses(tmp);
  };

  const handleChangeTextItem = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const tmp = [...textes];
    tmp[index].type = event.target.value;
    setTextes(tmp);
  };

  const handleChangeAddressItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const tmp = [...addresses];
    tmp[index].address = event.target.value;
    setAddresses(tmp);
  };

  const handleChangeTxtItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const tmp = [...textes];
    tmp[index].value = event.target.value;
    setTextes(tmp);
  };

  const handleChangeContenthash = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContenthash(event.target.value);
  };

  const handleClickAdd = () => {
    const tmpCoinType: number[] = [];
    addresses.forEach((addr) => {
      tmpCoinType.push(addr.coinType);
    });
    const firstCoinType = Chains.filter(
      (chain) => ![...tmpCoinType].includes(chain.coinType)
    )[0]['coinType'];

    setAddresses((v) => [...v, { coinType: firstCoinType, address: '' }]);
  };

  const handleClickDeleteAdd = (ct: number) => {
    return function () {
      setAddresses((v) => v.filter((addr) => addr.coinType !== ct));
    };
  };

  const handleClickAddTextRecord = () => {
    if (textes.length === textType.length) {
      alert('add enough');
      return;
    }
    const types = textType.filter(
      (type) => ![...textes.map((t) => t.type)].includes(type)
    );

    if (!types[0]) {
      return;
    }
    const newTextRecord: TextRecord = {
      value: '',
      type: types[0],
      id: Math.ceil(Math.random() * 22),
    };
    setTextes((v) => [...v, newTextRecord]);
  };

  const handleClickAddTextDelete = (id: number) => {
    return function () {
      setTextes((v) => v.filter((t) => t.id !== id));
    };
  };

  const handleClickAddShowModel = () => {
    setAddresses([{ coinType: Chains[0].coinType, address: '' }]);
    setTextes([
      {
        type: textType[0],
        value: '',
        id: Math.ceil(Math.random() * 22),
      },
    ]);
    setNode('');
    setContenthash('');
    setShow(true);
    setUpdateId('');
  };

  const handleClickOk = () => {
    if (
      !contenthash ||
      !node ||
      addresses.some((item) => !item.address) ||
      textes.some((item) => !item.value)
    ) {
      alert('Please enter in the necessary information');
      return;
    }
    const ensData = {
      node,
      address: {},
      text: {},
      contenthash,
      id: '',
    };
    addresses.forEach((addr) => {
      // @ts-ignore
      ensData.address[addr.coinType] = addr.address;
    });
    textes.forEach((text) => {
      // @ts-ignore
      ensData.text[text.type] = text.value;
    });
    if (updateId) {
      ensData.id = updateId;
    }

    axios
      .post(`${apiUrl}/ens`, ensData)
      .then((res) => {
        setShow(false);
        setF5((v) => v + 1);
      })
      .then((err) => console.error);
  };

  const handleClickUpdateShowModel = (id: string) => {
    return function () {
      const ensItem: Item = items.find((item) => item._id === id) as Item;
      const addressesArr = Object.entries(ensItem.address);
      const newAddresses: AddressRecord[] = [];
      addressesArr.forEach((addr) => {
        newAddresses.push({ coinType: Number(addr[0]), address: addr[1] });
      });
      setAddresses(newAddresses);
      const textesArr = Object.entries(ensItem.text);
      const newTextes: TextRecord[] = [];
      textesArr.forEach((text) => {
        newTextes.push({
          type: text[0],
          value: text[1],
          id: Math.ceil(Math.random() * 22),
        });
      });
      setTextes(newTextes);
      setNode(ensItem.node);
      setContenthash(ensItem.contenthash);
      setUpdateId(id);
      setShow(true);
    };
  };

  const handleClickDelete = (id: string) => {
    return function () {
      axios
        .post(`${apiUrl}/ens/delete`, { id })
        .then((res) => {
          setShow(false);
          setF5((v) => v + 1);
        })
        .then((err) => console.error);
    };
  };

  const formatAddresses = (addresses: AddressObj) => {
    const elements: JSX.Element[] = [];
    for (const k in addresses) {
      elements.push(
        <Fragment key={k}>
          <span key={k}>
            {k}: {addresses[k]}
          </span>
          <br />
        </Fragment>
      );
    }
    return elements;
  };

  const formatText = (text: AddressObj) => {
    const elements: JSX.Element[] = [];
    for (const k in text) {
      elements.push(
        <Fragment key={k}>
          <span>
            {k}: {text[k]}
          </span>
          <br />
        </Fragment>
      );
    }
    return elements;
  };

  const formatContenthash = (contenthash: string) => {
    if (contenthash.startsWith('0xe3')) {
      return (
        <span>
          ipfs://{decode(contenthash)}
          <br />
          {contenthash}
        </span>
      );
    } else {
      return <span>{contenthash}</span>;
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>ENS management</div>
      <div className={styles.center}>
        <Button
          variant="contained"
          sx={{ textTransform: 'none' }}
          onClick={handleClickAddShowModel}
        >
          Add
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Addresses</TableCell>
              <TableCell>Text Records</TableCell>
              <TableCell>Contenthash</TableCell>
              <TableCell>Operator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.node}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatAddresses(item.address)}
                </TableCell>
                <TableCell>
                  <Box>{formatText(item.text)}</Box>
                </TableCell>
                <TableCell>
                  <Box>{formatContenthash(item.contenthash)}</Box>
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ textTransform: 'none' }}
                    variant="outlined"
                    onClick={handleClickDelete(item._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    sx={{ ml: 1, textTransform: 'none' }}
                    variant="contained"
                    onClick={handleClickUpdateShowModel(item._id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={show}
        onClose={toggleModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Add ens record'}</DialogTitle>
        <DialogContent sx={{ width: '600px' }}>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                sx={{ width: '520px' }}
                id="outlined-helperText"
                label="Node name"
                value={node}
                onChange={handleChangeNode}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Chain name
              </InputLabel>
              <Select
                sx={{ width: '160px' }}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={addresses[0]?.coinType || Chains[0].coinType}
                label="Chain name"
                onChange={(event) => handleChangeChainItem(event, 0)}
                fullWidth={true}
              >
                {Chains.map((chain) => (
                  <MenuItem key={chain.coinType} value={chain.coinType}>
                    {chain.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <TextField
                sx={{ width: '250px' }}
                id="outlined-helperText"
                label="Address"
                value={addresses[0]?.address || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeAddressItem(event, 0)
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1 }}>
              <Button
                sx={{ mt: 1, textTransform: 'none' }}
                variant="outlined"
                onClick={handleClickAdd}
              >
                Add
              </Button>
            </FormControl>
          </Box>

          {addresses
            .filter((_, j) => j !== 0)
            .map((item, i) => (
              <Box key={item.coinType + i}>
                <FormControl sx={{ m: 1 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Chain name
                  </InputLabel>
                  <Select
                    sx={{ width: '160px' }}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={addresses[i + 1].coinType}
                    label="Chain name"
                    onChange={(event) => handleChangeChainItem(event, i + 1)}
                    fullWidth={true}
                  >
                    {Chains.map((chain) => (
                      <MenuItem key={chain.coinType} value={chain.coinType}>
                        {chain.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <TextField
                    sx={{ width: '250px' }}
                    id="outlined-helperText"
                    label="Address"
                    value={addresses[i + 1].address}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeAddressItem(event, i + 1)
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 1, textAlign: 'right' }}>
                  <Button
                    sx={{ mt: 1, textTransform: 'none' }}
                    variant="outlined"
                    onClick={handleClickDeleteAdd(item.coinType)}
                  >
                    Delete
                  </Button>
                </FormControl>
              </Box>
            ))}

          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="text-records-label">Text Records</InputLabel>
              <Select
                sx={{ width: '160px' }}
                labelId="text-records-label"
                id="text-records"
                value={textes[0]?.type || textType[0]}
                label="text-records"
                onChange={(event) => handleChangeTextItem(event, 0)}
              >
                {textType.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                sx={{ width: '250px' }}
                id="outlined-helperText"
                label="Text"
                value={textes[0]?.value || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeTxtItem(event, 0)
                }
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <Button
                sx={{ mt: 1, textTransform: 'none' }}
                variant="outlined"
                onClick={handleClickAddTextRecord}
              >
                Add
              </Button>
            </FormControl>
          </Box>

          {textes
            .filter((_, j) => j !== 0)
            .map((ot, i) => (
              <Box key={ot.id + '' + i}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="text-records-label">Text Records</InputLabel>
                  <Select
                    sx={{ width: '160px' }}
                    labelId="text-records-label"
                    id="text-records"
                    value={textes[i + 1].type}
                    label="text-records"
                    onChange={(event) => handleChangeTextItem(event, i + 1)}
                  >
                    {textType.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <TextField
                    sx={{ width: '250px' }}
                    id="outlined-helperText"
                    label="Text"
                    value={textes[i + 1].value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeTxtItem(event, i + 1)
                    }
                  />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                  <Button
                    sx={{ mt: 1, textTransform: 'none' }}
                    variant="outlined"
                    onClick={handleClickAddTextDelete(ot.id)}
                  >
                    Delete
                  </Button>
                </FormControl>
              </Box>
            ))}

          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                sx={{ width: '520px' }}
                id="outlined-helperText"
                label="ContentHash"
                value={contenthash}
                onChange={handleChangeContenthash}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Button sx={{ mr: 2 }} onClick={toggleModel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleClickOk} autoFocus variant="contained">
            Update
          </Button>
        </Box>
      </Dialog>
    </main>
  );
}
