export default function DateToday() {
	let calendar = new Date();
	let date = calendar.getUTCDate();
	let month = calendar.getMonth();
	let hours = calendar.getHours();
	let min = calendar.getUTCMinutes();
	// let sec = calendar.getUTCSeconds();
	let year = calendar.getUTCFullYear();

	let today = `${month + 1}/${date}/${year} ${
		hours < 12 ? '0' + hours : hours - 12
	}:${min < 10 ? '0' + min : min} ${hours < 12 ? 'AM' : 'PM'}`;
	return today;
}
