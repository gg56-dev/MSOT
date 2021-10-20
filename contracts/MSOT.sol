// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./libraries/safeMath.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MSOT is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    using SafeMath for uint256;

    uint256 public constant _totalSupply = 12 * (10 ** 5);

    bool public isPayable;
    bool public isHalted;

    address public authorizedCaller;
    address public thisOwner;

    mapping(address => uint256) internal balances;
    mapping(address => mapping(address => uint256)) internal allowed;
    mapping(address => bool) public locked;
    
    function initialize() public initializer{
        __ERC20_init('Msot', "MSOT");
        __Ownable_init();
        _mint(msg.sender, _totalSupply);
        balances[msg.sender] = _totalSupply;
        isPayable = true;
        isHalted = false;
        authorizedCaller = msg.sender;
        thisOwner = msg.sender;

    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner{} 

    modifier checkHalted() {
        require(isHalted == false);
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == thisOwner || msg.sender == authorizedCaller);
        _;
    }
    function transferAuthorizedCaller(address _newAuthorizedCaller) public onlyOwner {
        require(_newAuthorizedCaller != address(0));
        authorizedCaller = _newAuthorizedCaller;
    }

    function totalSupply() public override view returns (uint256) {
        return _totalSupply;
    }

    function sendFeeCurrency(address payable _receiver, uint256 _amount) external payable onlyAuthorized returns (bool) {
        if (isPayable == false) {
            revert();
        }

        _receiver.transfer(_amount);
        return true;
    }

    function setIsPayable(bool p) external onlyAuthorized {
        isPayable = p;
    }

    function setHalted(bool _isHalted) external onlyOwner {
        isHalted = _isHalted;
    }

    function setLock(address _addr, bool _lock) external onlyAuthorized {
        locked[_addr] = _lock;
    }

    function balanceOf(address _tokenOwner) public override view returns (uint) {
        return balances[_tokenOwner];
    }

    function transfer(address _to, uint _amount) public override checkHalted returns (bool) {
        if (msg.sender != owner()) {
            require(locked[msg.sender] == false && locked[_to] == false);
        }
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }

    function transferFrom(address _from, address _to, uint _amount) public override checkHalted returns (bool) {
        if (msg.sender != owner()) {
            require(locked[msg.sender] == false && locked[_from] == false && locked[_to] == false);
        }
        require(_amount <= balances[_from]);
        if (_from != msg.sender) {
            require(_amount <= allowed[_from][msg.sender], "Allowed transfer amount exceeded!");
            allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_amount);
        }
        balances[_from] = balances[_from].sub(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Transfer(_from, _to, _amount);
        return true;
    }

    function allowance(address _tokenOwner, address _spender) public override view returns (uint) {
        return allowed[_tokenOwner][_spender];
    }

    function approve(address _spender, uint _amount) public override checkHalted returns (bool) {
        require(locked[_spender] == false && locked[msg.sender] == false);

        allowed[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }
}

