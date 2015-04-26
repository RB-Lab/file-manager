function File(data){
	this.id = data.id;
	this.title = data.title;
	this.status = data.status;
	this.type = data.type;
	this.created = data.created * 1000;
	this.modified = data.modified * 1000;
}

Object.defineProperty(File, 'FIELDS', {
	value: ['title','status','type','created','modified']
});
Object.freeze(File.FIELDS);

module.exports = File;
