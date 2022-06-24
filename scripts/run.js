

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log ("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.sendWave("test","Carl");
    await waveTxn.wait();

    waveTxn = await waveContract.sendWave("Yes","Carl");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).sendWave("Je t'aime","RandomPerson");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(user2).sendWave("Hello","User2");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(user3).sendWave("World","User3");
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    const WaveList = await Promise.all(
        [...Array(waveCount)].map(() =>waveContract.Contract.getWaves())
    
    );
    


};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();